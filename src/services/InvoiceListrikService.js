import axios from 'axios';
const INVOICE_LISTRIK_BASE_API_URL = "http://localhost:8080/api/invoice/listrik/";

class InvoiceListrikService{
    getInvoiceListrik(){
        return axios.get(INVOICE_LISTRIK_BASE_API_URL);
    }
    createInvoiceListrik(invoice){
        return axios.post(INVOICE_LISTRIK_BASE_API_URL,invoice);
    }
    createInvoiceListrikParameter(invoice){
        return axios.post(INVOICE_LISTRIK_BASE_API_URL+"parameter/",invoice)
    }
    getInvoiceListrikParameter(invoiceNo){
        return axios.get(INVOICE_LISTRIK_BASE_API_URL+"parameter/"+invoiceNo)
    }
    getInvoiceListrikByInvoiceNo(invoiceNo){
        return axios.get(INVOICE_LISTRIK_BASE_API_URL+invoiceNo);
    }
    updateInvoiceListrik(invoice,id){
        return axios.put(INVOICE_LISTRIK_BASE_API_URL+id,invoice);
    }
    deleteInvoice(id){
        return axios.delete(INVOICE_LISTRIK_BASE_API_URL+id);
    }
}
export default new InvoiceListrikService()