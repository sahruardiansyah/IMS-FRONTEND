import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CCardFooter,
  CButton,
  CTextarea,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import InvoiceListrikService from "src/services/InvoiceListrikService";
import CinemaService from "src/services/CinemaService";

export default class CreateInvoiceLsitrik extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceNo: "",
      cinemaId: "",
      vendorId: "",
      invoiceDate: "",
      invoicePeriode: "",
      ppn: "",
      materai: "",
      amountTotal: "",
      keterangan: "",
      status: false,
      selectCinema:[],
      id:"",
      nama:""
    };
    this.createInvoiceListrik = this.createInvoiceListrik.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }
  componentDidMount(){
    CinemaService.getCinema().then((res) => {
      this.setState({ selectCinema: res.data });
      this.state.selectCinema.map(data =>{
        this.setState({id: data.id, nama: data.nama});

      })
      
    });

  }

  onChange(e) {
    let newData = {
      invoiceNo: this.state.invoiceNo,
      cinemaId: this.state.cinemaId,
      vendorId: this.state.vendorId,
      invoiceDate: this.state.invoiceDate,
      invoicePeriode: this.state.invoicePeriode,
      ppn: this.state.ppn,
      materai: this.state.materai,
      amountTotal: this.state.amountTotal,
      keterangan: this.state.keterangan,
      status: this.state.status,
    };
    newData[e.target.name] = e.target.value;
    this.setState(newData);
    console.log(newData);
  }
  selectChange(e){
    this.setState({id: e.value, nama:e.label});
    
  }

  createInvoiceListrik = (e) => {
    e.preventDefault();
    let invoice = {
      invoiceNo: this.state.invoiceNo,
      cinemaId: this.state.cinemaId,
      vendorId: this.state.vendorId,
      invoiceDate: this.state.invoiceDate,
      invoicePeriode: this.state.invoicePeriode,
      ppn: this.state.ppn,
      materai: this.state.materai,
      amountTotal: this.state.amountTotal,
      keterangan: this.state.keterangan,
      status: this.state.status,
    };
    InvoiceListrikService.createInvoiceListrik(invoice).then((res) => {
      this.props.history.push("/invoice/listrik");
      console.log(res);
    });
  };

  cancel = (e) => {
    this.props.history.push("/invoice/listrik");
  };
  render() {
    let option = []
    if (this.state.selectCinema.length > 0) {
      this.state.selectCinema.forEach(role => {
        let roleDate = {}
        roleDate.value = role.id
        roleDate.label = role.nama
        option.push(roleDate)
      })
    }
    console.log(option)
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Add Invoice Listrik</h3>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="invoiceNo">Invoice No</CLabel>
                </CCol>
                <CCol xs="2">
                  <CInput
                    name="invoiceNo"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.invoiceNo}
                  />
                </CCol>
                <CCol md="1">
                  <CLabel htmlFor="outlet">Outlet</CLabel>
                </CCol>
                <CCol sm="4">

                  <Select options={option} onChange={this.selectChange}/>
                  {/* <CInput
                    name="nama"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.nama}
                  /> */}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email"> Vendor</CLabel>
                </CCol>
                <CCol sm="4">
                  <CSelect
                    name="vendor"
                    onChange={this.onChange}
                    value={this.state.vendorId}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email">Tanggal Invoice</CLabel>
                </CCol>
                <CCol sm="2">
                  {/* <CSelect name="select">
                    <option value="0">Please select</option>
                  </CSelect> */}
                  <CInput
                    type="date"
                    id="invoiceDate"
                    name="invoiceDate"
                    onChange={this.onChange}
                    value={this.state.invoiceDate}
                  ></CInput>
                </CCol>
                <CCol md="1">
                  <CLabel htmlFor="email">Periode</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput
                    type="date"
                    id="invoicePeriode"
                    name="invoicePeriode"
                    onChange={this.onChange}
                    value={this.state.invoicePeriode}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="telepon">ppn</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput
                    name="ppn"
                    placeholder="ppn"
                    onChange={this.onChange}
                    value={this.state.ppn}
                  />
                </CCol>
                <CCol md="1">
                  <CLabel htmlFor="telepon">Materai</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput
                    name="materai"
                    id="materai"
                    onChange={this.onChange}
                    value={this.state.materai}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="alamat">Amount Total</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput
                    name="amountTotal"
                    onChange={this.onChange}
                    value={this.state.amountTotal}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="alamat">Keterangan</CLabel>
                </CCol>
                <CCol sm="4">
                  <CTextarea
                    name="keterangan"
                    placeholder="Keterangan"
                    onChange={this.onChange}
                    value={this.state.keterangan}
                  />
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={this.createCinema}
              >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>{" "}
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={this.cancel}
              >
                <CIcon name="cil-ban" /> Cancel
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}
