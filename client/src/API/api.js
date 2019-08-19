import axios from 'axios'


const api ={
    getVideos: (type) =>{
        //un comment it for deploy:
        // return axios.get(`https://reactresponsivevideoviewer.herokuapp.com/videos${type ? `/${type}` : ``}`);
        return axios.get(`http://localhost:8000/videos${type ? `/${type}` : ``}`);
    }
}

export default api;