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
import VendorService from "src/services/VendorService";

export default class CreateInvoiceLsitrik extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceNo: "",
      cinemaId: "",
      vendorId: "",
      invoiceDate: "",
      invoicePeriode: new Date(),
      ppn: "",
      materai: "",
      amountTotal: "",
      keterangan: "",
      status: false,
      selectCinema: [],
      // id:"",
      namaCinema: "",
      selectVendor: [],
      namaVendor: "",
    };
    this.createInvoiceListrik = this.createInvoiceListrik.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectCinemaChange = this.selectCinemaChange.bind(this);
    this.selectVendorChange = this.selectVendorChange.bind(this);
  }
  componentDidMount() {
    CinemaService.getCinema().then((res) => {
      this.setState({ selectCinema: res.data });
    });
    this.state.selectCinema.map((data) => {
      this.setState({ cinemaId: data.id, namaCinema: data.nama });
    });
    VendorService.getVendor().then((res) => {
      this.setState({ selectVendor: res.data });
    });
    this.state.selectVendor.map((data) => {
      this.setState({ vendorId: data.id, namaVendor: data.vendorName });
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
    this.setState({data:newData});
    console.log(newData);
  }
  selectCinemaChange(e) {
    this.setState({ cinemaId: e.value, namaCinema: e.label });
  }
  selectVendorChange(e) {
    this.setState({ vendorId: e.value, namaVendor: e.label });
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
    let optionCinema = [];
    if (this.state.selectCinema.length > 0) {
      this.state.selectCinema.forEach((role) => {
        let roleDate = {};
        roleDate.value = role.id;
        roleDate.label = role.nama;
        optionCinema.push(roleDate);
      });
    }

    let optionVendor = [];
    if (this.state.selectVendor.length > 0) {
      this.state.selectVendor.forEach((role) => {
        let roleDate = {};
        roleDate.value = role.id;
        roleDate.label = role.vendorName;
        optionVendor.push(roleDate);
      });
    }
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
                  <CLabel htmlFor="cinemaId">Outlet</CLabel>
                </CCol>
                <CCol sm="4">
                  <Select
                    name="cinemaId"
                    options={optionCinema}
                    value={this.state.cinemaId}
                    onChange={this.selectCinemaChange}
                  />
                  {/* <CInput
                    name="nama"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.nama}
                  /> */}
                  {this.state.cinemaId}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email"> Vendor</CLabel>
                </CCol>
                <CCol sm="4">
                  <Select
                    name="cinemaId"
                    options={optionVendor}
                    value={this.state.vendorId}
                    onChange={this.selectVendorChange}
                  />
                  {/* <CSelect
                    name="vendor"
                    onChange={this.onChange}
                    value={this.state.vendorId}
                  /> */}
                  {this.state.namaVendor}
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
                  <CLabel htmlFor="periode">Periode</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput
                    type="date"
                    id="invoicePeriode"
                    name="invoicePeriode"
                    onChange={this.onChange}
                    value={this.state.invoicePeriode}
                  />
                  {/* <DatePicker
                    dateFormat="mm yyyy"
                    showMonthYearDropdown
                    value={this.state.invoicePeriode}
                    onChange={this.onChange}
                  /> */}
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
                onClick={this.createInvoiceListrik}
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
