import axios from 'axios';
const VENDOR_BASE_API_URL = "http://localhost:8080/api/vendor/";

class VendorService{
    getVendor(){
        return axios.get(VENDOR_BASE_API_URL);
    }
    createVendor(vendor){
        return axios.post(VENDOR_BASE_API_URL,vendor);
    }
    getVendorById(id){
        return axios.get(VENDOR_BASE_API_URL+id);
    }
    updateVendor(vendor,id){
        return axios.put(VENDOR_BASE_API_URL+id,vendor);
    }
    deleteVendor(id){
        return axios.delete(VENDOR_BASE_API_URL+id);
    }
}
export default new VendorService()