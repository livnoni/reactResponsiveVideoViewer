var { graphql, buildSchema } = require('graphql');
const {videos} = require("../dal/videos");

/**
 * I used documentation from that link -> https://graphql.org/graphql-js/
 */

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Video{
    title: String,
    type: String,
    source: String,
    videoId: String,
    url: String,
    views: Int
  }
  
  type Query {
    filterBySource(source: String): [Video]
    getAllVideos: [Video]
  }

`);

// The root provides a resolver function for each API endpoint
const root = {
    filterBySource: ({source})=>{
        let result = videos.filter(a=>a.source === source);
        return result
    },
    getAllVideos: ()=>{
        return videos
    }
};

module.exports = {
    filterBySource: async (source)=>{
        console.info(`[graphql] func - filterBySource() args - source:${source} `);
        let result = await graphql(schema, `{ filterBySource(source: "${source}") {title type source videoId url views}}`, root);
        return result.data.filterBySource;
    },
    getAllVideos: async ()=>{
        console.info(`[graphql] func - getAllVideos() `);
        let result = await graphql(schema, `{ getAllVideos {title type source videoId url views}}`, root);
        return result.data.getAllVideos;
    }
};

