const chai = require('chai');
const expect = chai.expect;
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);

const {filterBySource, getAllVideos} = require("../graphql/query");

var {videos} = require("../dal/videos");
/**
 * graphql return null if property not exist - i add null for deep compare testing
 */
videos = videos.map(video=>{
    if(!video.url) video.url = null;
    if(!video.title) video.title = null;
    if(!video.videoId) video.videoId = null;
    return video;
});

describe('Testing graphql queries:', () => {
    it('get all videos', async () => {
        let result = await getAllVideos();
        expect(result).to.deep.equalInAnyOrder(videos);
    });

    it('get filtered videos - facebook only', async () => {
        let source = "facebook";
        let result = await filterBySource(source);
        expect(result).to.deep.equalInAnyOrder(videos.filter(video=>video.source === source));
    });

    it('get filtered videos - youtube only', async () => {
        let source = "youtube";
        let result = await filterBySource(source);
        expect(result).to.deep.equalInAnyOrder(videos.filter(video=>video.source === source));
    });

    it('get filtered videos - url only', async () => {
        let source = "url";
        let result = await filterBySource(source);
        expect(result).to.deep.equalInAnyOrder(videos.filter(video=>video.source === source));
    });

    it('get filtered videos that not supported', async () => {
        let source = "notSupportedSource";
        let result = await filterBySource(source);
        expect(result).to.deep.equalInAnyOrder([]);
    });
});