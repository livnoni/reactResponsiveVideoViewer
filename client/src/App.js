import React, {Component} from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import VideoList from  './components/VideoList/VideoList'
import API from "./API/api"

const TYPES = {
    ALL:        {logicName: "all",      displayName: "All"},
    FACEBOOK:   {logicName: "facebook", displayName: "Facebook"},
    YOUTUBE:    {logicName: "youtube",  displayName: "Youtube"},
    URL:        {logicName: "url",      displayName: "Url"}
};

class App extends Component {

    state = {
        filterValue: TYPES.ALL.logicName,
        loading: true,
        error: false,
        videos: []
    };

    async setVideos(type) {
        try {
            this.setState({loading: true});
            let videos = await API.getVideos(type);
            this.setState({error: false, videos: videos.data});
        } catch (e) {
            console.error(`renderVideos error: ${e}`);
            this.setState({error: true});
            throw e;
        } finally {
            this.setState({loading: false});
        }
    }

    async componentDidMount() {
        await this.setVideos();
    }

    onSelectChanged(event) {
        let type = event.target.value;
        this.setState({filterValue: type});
        if(type === TYPES.ALL.logicName) this.setVideos();
        else this.setVideos(type);
    }

    renderVideos() {
        if (this.state.loading) return (<h2>Loading... It may takes a few seconds, i am using free heroku server :)</h2>);
        if (this.state.error) return (<h2>Error!</h2>);

        return (this.state.videos.length > 0 ? <VideoList videos={this.state.videos}/> : <h3>No Videos Available</h3>);
    }

    render() {
        return (
            <div className="App">
                <Toolbar/>

                <div className={"filter_container"}>
                    <h3>Choose Type: </h3>
                    <select className={"select_filter"} onChange={this.onSelectChanged.bind(this)} value={this.state.filterValue}>
                        {Object.keys(TYPES).map(type => <option value={TYPES[type].logicName} key={`${type}`}>{TYPES[type].displayName}</option>)}
                    </select>
                </div>

                {this.renderVideos()}
            </div>
        );
    }
}

export default App;
