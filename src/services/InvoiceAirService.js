import axios from 'axios';
const INVOICE_AIR_BASE_API_URL = "http://localhost:8080/api/invoice/air/";

class InvoiceAirService{
    getInvoiceAir(){
        return axios.get(INVOICE_AIR_BASE_API_URL);
    }
    createInvoiceAir(invoice){
        return axios.post(INVOICE_AIR_BASE_API_URL,invoice);
    }
    createInvoiceAirParameter(invoice){
        return axios.post(INVOICE_AIR_BASE_API_URL+"parameter/",invoice)
    }
    getInvoiceAirParameter(invoiceNo){
        return axios.get(INVOICE_AIR_BASE_API_URL+"parameter/"+invoiceNo)
    }
    getInvoiceAirByInvoiceNo(invoiceNo){
        return axios.get(INVOICE_AIR_BASE_API_URL+invoiceNo);
    }
    updateInvoiceAir(invoice,id){
        return axios.put(INVOICE_AIR_BASE_API_URL+id,invoice);
    }
    deleteInvoice(id){
        return axios.delete(INVOICE_AIR_BASE_API_URL+id);
    }
}
export default new InvoiceAirService()