import axios from 'axios';
const INVOICE_GAS_BASE_API_URL = "http://localhost:8080/api/invoice/gas/";

class InvoiceGasService{
    getInvoiceGas(){
        return axios.get(INVOICE_GAS_BASE_API_URL);
    }
    createInvoiceGas(invoice){
        return axios.post(INVOICE_GAS_BASE_API_URL,invoice);
    }
    createInvoiceGasParameter(invoice){
        return axios.post(INVOICE_GAS_BASE_API_URL+"parameter/",invoice)
    }
    getInvoiceGasParameter(invoiceNo){
        return axios.get(INVOICE_GAS_BASE_API_URL+"parameter/"+invoiceNo)
    }
    getInvoiceGasByInvoiceNo(invoiceNo){
        return axios.get(INVOICE_GAS_BASE_API_URL+invoiceNo);
    }
    updateInvoiceGas(invoice,id){
        return axios.put(INVOICE_GAS_BASE_API_URL+id,invoice);
    }
    deleteInvoice(id){
        return axios.delete(INVOICE_GAS_BASE_API_URL+id);
    }
}
export default new InvoiceGasService()