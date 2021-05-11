import axios from 'axios';
const INVOICE_OUTSOURCING_BASE_API_URL = "http://localhost:8080/api/invoice/outsourcing/";

class InvoiceOutsourcingService{
    getInvoiceOutsourcing(){
        return axios.get(INVOICE_OUTSOURCING_BASE_API_URL);
    }
    createInvoiceOutsourcing(invoice){
        return axios.post(INVOICE_OUTSOURCING_BASE_API_URL,invoice);
    }
    createInvoiceOutsourcingParameter(invoice){
        return axios.post(INVOICE_OUTSOURCING_BASE_API_URL+"parameter/",invoice)
    }
    getInvoiceOutsourcingParameter(invoiceNo){
        return axios.get(INVOICE_OUTSOURCING_BASE_API_URL+"parameter/"+invoiceNo)
    }
    getInvoiceOutsourcingByInvoiceNo(invoiceNo){
        return axios.get(INVOICE_OUTSOURCING_BASE_API_URL+invoiceNo);
    }
    updateInvoiceOutsourcing(invoice,id){
        return axios.put(INVOICE_OUTSOURCING_BASE_API_URL+id,invoice);
    }
    deleteInvoice(id){
        return axios.delete(INVOICE_OUTSOURCING_BASE_API_URL+id);
    }
}
export default new InvoiceOutsourcingService()