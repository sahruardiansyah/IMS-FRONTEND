import axios from 'axios';
const CINEMA_BASE_API_URL = "http://localhost:8080/api/cinema/";

class CinemaService{
    getCinema(){
        return axios.get(CINEMA_BASE_API_URL);
    }
    createCinema(cinema){
        return axios.post(CINEMA_BASE_API_URL,cinema);
    }
    getCinemaById(id){
        return axios.get(CINEMA_BASE_API_URL+id);
    }
    updateCinema(cinema,id){
        return axios.put(CINEMA_BASE_API_URL+id,cinema);
    }
    deleteCinema(id){
        return axios.delete(CINEMA_BASE_API_URL+id);
    }
}
export default new CinemaService()