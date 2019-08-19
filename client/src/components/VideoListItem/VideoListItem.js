import React, {Component} from 'react';
import "./VideoListItem.css";

class VideoListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            video: props.video,
            index: props.index
        }
    }

    onLoad(){
        this.setState({loading: false});
    }

    renderVideo = ({source, videoId, url}) => {
        if(source && videoId){
            //show as iframe:
            let src;
            if (source === "youtube" && videoId) src = `https://www.youtube.com/embed/${videoId}`;
            if (source === "facebook" && videoId) src = `http://www.facebook.com/video/embed?video_id=${videoId}`;
            return (
                <div className={"iframe_wrapper"}>
                    <iframe src={src} allowFullScreen={"allowFullScreen"} frameBorder="0" autoPlay={false} onLoad={this.onLoad.bind(this)}></iframe>
                    {this.state.loading ? "Loading Video ..." : ""}
                </div>
            )
        }else{
            //show as video tag (this for disable auto play):
            return (
                <div className={"iframe_wrapper"}>
                    <video controls><source src={url}></source></video>
                </div>
            )
        }

    };

    formatNumOfViews = (num) =>{
        if(num < 999) return `${num} views`;
        if(num > 999 && num < 999999) return `${(num / 1000).toFixed(1)} K views`;
        if(num > 999999 && num < 999999999) return `${(num / 1000000).toFixed(1)} M views`;
        if(num > 999999999) return `${(num / 1000000000).toFixed(1)} B views`;
    };

    render() {
        return (
            <div className={"video_wrapper"} key={`video_wrapper_${this.state.index}`}>

                <div className={"video_info"}>
                    <h3 className={"video_title"}>{this.state.index + 1}. {this.state.video.title || "No Title"}</h3>
                    <h3 className={"spacer"}></h3>
                    <h3 className={"video_views"}>{this.formatNumOfViews(this.state.video.views)}</h3>
                </div>

                {this.renderVideo(this.state.video)}
            </div>
        )
    }

};

export default VideoListItem;