import axios from 'axios'


const api ={
    getVideos: (type) =>{
        return axios.get(`http://localhost:8000/videos${type ? `/${type}` : ``}`);
    }
}

export default api;