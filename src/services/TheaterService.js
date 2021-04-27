import axios from 'axios';
const THEATER_BASE_API_URL = "http://localhost:8080/api/theater/";
const LOB_BASE_API_URL = "http://localhost:8080/api/lob/";

class TheaterService{
    getTheater(){
        return axios.get(THEATER_BASE_API_URL);
    }
    createTheater(theater){
        return axios.post(THEATER_BASE_API_URL,theater);
    }
    getTheaterById(id){
        return axios.get(THEATER_BASE_API_URL+id);
    }
    updateTheater(theater,id){
        return axios.put(THEATER_BASE_API_URL+id,theater);
    }
    deleteTheater(id){
        return axios.delete(THEATER_BASE_API_URL+id);
    }
    getLob(){
        return axios.get(LOB_BASE_API_URL);
    }
    getLobId(id){
        return axios.get(LOB_BASE_API_URL+id);
    }
}
export default new TheaterService()