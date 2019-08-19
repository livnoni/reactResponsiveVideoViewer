import React from 'react';
import VideoListItem from '../VideoListItem/VideoListItem'
import './VideoList.css';

const VideoList = (props)=>{
    const videoItems = props.videos.map((video, index)=>{
        return (
            <VideoListItem video={video} index={index}/>
        )
    });

    return (
        <div className={"video_list"}>
            {videoItems}
        </div>
    );
};

export default VideoList;