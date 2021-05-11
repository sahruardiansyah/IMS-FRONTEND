import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTextarea
} from "@coreui/react";
import React from "react";
import {
  Table,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  Button,
  Label,
} from "reactstrap";
import CinemaService from "src/services/CinemaService";
import VendorService from "src/services/VendorService";
import Select from "react-select";
import ParameterList from "./ParameterList"
import InvoiceOutsourcingService from "src/services/InvoiceOutsourcingService";
export default class ListInvoiceListrik extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: [],
      show: false,
      showCreateModal: false,
      showUpdateModal: false,
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
      selectCinema: [],
      selectVendor: [],
      parameterList:[
        {
        id: Math.random(),
        manPower:"",


      }]
    };
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.showUpdateModal = this.showUpdateModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectCinemaChange = this.selectCinemaChange.bind(this);
    this.selectVendorChange = this.selectVendorChange.bind(this);
    this.createInvoiceOutsourcing = this.createInvoiceOutsourcing.bind(this);
    this.updateInvoiceOutsourcing = this.updateInvoiceOutsourcing.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.clickOnDelete=this.clickOnDelete.bind(this);
    this.createInvoiceOutsourcingParameter=this.createInvoiceOutsourcingParameter.bind(this);

  }

  handleChange = (e) => {
    if (["invoiceNo", "manPower"].includes(e.target.name)) {
        let parameterList = [...this.state.parameterList]
        parameterList[e.target.dataset.id][e.target.name] = e.target.value;
        // console.log(parameterList)
    } else {
        this.setState({ [e.target.name]: e.target.value })
    }
    console.log(this.state.parameterList)
}

addNewRow = e => {
  this.setState(prevState => ({
    parameterList: [
      ...prevState.parameterList,
      {
        id: Math.random(),
        manPower:"",
      }
    ]
  }));
};

deleteRow = index => {
  this.setState({
    parameterList: this.state.parameterList.filter(
      (s, sindex) => index !== sindex
    )
  });
  console.log("doing delete parameter")
};

clickOnDelete(record) {
  this.setState({
    parameterList: this.state.parameterList.filter(r => r !== record)
  });
}

  updateInvoiceOutsourcing = (e) =>{
    e.preventDefault()
    let invoice ={
      cinemaId: this.state.cinemaId,
      vendorId: this.state.vendorId,
      invoiceDate: this.state.invoiceDate,
      invoicePeriode: this.state.invoicePeriode,
      ppn: this.state.ppn,
      materai: this.state.materai,
      amountTotal: this.state.amountTotal,
      keterangan: this.state.keterangan,
      status: this.state.status,
    }
    InvoiceOutsourcingService.updateInvoiceOutsourcing(invoice,this.state.invoiceNo).then((res)=>{
      this.setState({showUpdateModal: false})
      console.log(res);
      this.reloadTable();
    })
  }

  showUpdateModal(invoiceNo) {
    InvoiceOutsourcingService.getInvoiceOutsourcingByInvoiceNo(invoiceNo).then((res) => {
      let currentInvoice = res.data;
      this.setState({
        showUpdateModal: !this.state.showUpdateModal,
        invoiceNo: currentInvoice.invoiceNo,
        cinemaId: currentInvoice.cinemaId,
        vendorId: currentInvoice.vendorId,
        invoiceDate: currentInvoice.invoiceDate,
        invoicePeriode: currentInvoice.invoicePeriode,
        ppn: currentInvoice.ppn,
        materai: currentInvoice.materai,
        amountTotal: currentInvoice.amountTotal,
        keterangan: currentInvoice.keterangan,
        status: currentInvoice.status,
      });
      console.log(currentInvoice)
    });
    // InvoiceAirService.getInvoiceListrikParameter(invoiceNo).then((res)=>{
    //     console.log(res.data)

    // })
  }
  
  createInvoiceOutsourcing = (e) => {
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
    InvoiceOutsourcingService.createInvoiceOutsourcing(invoice).then((res) => {
      this.setState({showCreateModal: false})
      console.log(res);
      this.reloadTable();
      this.createInvoiceOutsourcingParameter();
    });
  };

  createInvoiceOutsourcingParameter=(e)=>{
    this.state.parameterList.map((parameter)=>{
      let newData ={
        invoiceNo: this.state.invoiceNo,
        manPower:parameter.awal,
      }
      InvoiceOutsourcingService.createInvoiceOutsourcingParameter(newData).then((res)=>{
        console.log(res.data);
      })
    })
  }
  getCinemas(){
    CinemaService.getCinema().then((res) => {
      this.setState({ selectCinema: res.data });
    });
  }
  getVendors(){
    VendorService.getVendor().then((res) => {
      this.setState({ selectVendor: res.data });
    });
  }

  toggleUpdate() {
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
    });
  }

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }
  toggleCreate() {
    this.setState({
      showCreateModal: !this.state.showCreateModal,
    });
  }
  showCreateModal() {
    this.setState({
      showCreateModal: !this.state.showCreateModal,
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
    });
  }

  showModal(id) {
    this.setState({
      show: !this.state.show,
      invoiceNo: id,
    });
    console.log(id);
  }

  reloadTable() {
    InvoiceOutsourcingService.getInvoiceOutsourcing().then((res) => {
      this.setState({ invoice: res.data,
       });
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

  selectCinemaChange(e) {
    this.setState({ cinemaId: e.value, namaCinema: e.label });
  }
  selectVendorChange(e) {
    this.setState({ vendorId: e.value, namaVendor: e.label });
  }


  deleteInvoice(id) {
      InvoiceOutsourcingService.deleteInvoice(id).then((res) => {
        this.setState({
          show: false,
        });
        this.reloadTable();
      });
  }

  componentDidMount() {
    this.reloadTable();
    this.getCinemas();
    this.getVendors();
  }

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
    let { parameterList } = this.state;
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h2>Daftar Invoice Outsourcing</h2>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <td>
                    <CInput></CInput>
                  </td>
                  <td>
                    <CButton color="primary">Search</CButton>

                    <CButton
                      type="submit"
                      color="primary"
                      style={{ marginLeft: "10px" }}
                      onClick={this.showCreateModal}
                    >
                      Add Invoice
                    </CButton>
                  </td>
                </thead>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td >INVOICE NO</td>
                    <td>OUTLET</td>
                    <td>STATUS</td>
                    <td>TGL INVOICE</td>
                    <td>COST PERIOD</td>
                    <td>ACTION</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.invoice.map((inv) => (
                    <tr key={inv.id}>
                      <td> {inv.id}</td>
                      <td> {inv.invoiceNo}</td>
                      <td> {inv.cinemaId}</td>
                      <td> {inv.status}</td>
                      <td> {inv.invoiceDate}</td>
                      <td> {inv.invoicePeriode}</td>
                      <td>
                      <Button
                          color="success"
                          onClick={()=> this.showUpdateModal(inv.invoiceNo)}
                        >
                          Update
                        </Button>
                        <Button
                          color="danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.showModal(inv.invoiceNo)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
            <CModal show={this.state.show} onClose={this.toggle}>
              <CModalHeader closeButton>Deleting Invoice</CModalHeader>
              <CModalBody>
                Apa anda yakin ingin menghapus {this.state.invoiceNo}?
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="primary"
                  onClick={() => this.deleteInvoice(this.state.invoiceNo)}
                >
                  Delete
                </CButton>{" "}
                <CButton color="secondary" onClick={this.toggle}>
                  Cancel
                </CButton>
              </CModalFooter>{" "}
            </CModal>
            <CModal size="xl" show={this.state.showCreateModal}
              onClose={this.toggleCreate}>
                <CModalHeader>Add New Invoice</CModalHeader>
                <CModalBody >
                <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="invoiceNo">Invoice No</CLabel>
                </CCol>
                <CCol xs="4">
                  <CInput
                    name="invoiceNo"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.invoiceNo}
                  />
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="cinemaId">Outlet</CLabel>
                </CCol>
                <CCol sm="4">
                  <Select
                    name="cinemaId"
                    options={optionCinema}
                    value={optionCinema.filter((opt)=>opt.value===this.state.cinemaId)}
                    onChange={this.selectCinemaChange}
                  />
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
                    value={optionVendor.filter((opt)=>opt.value===this.state.vendorId)}
                    onChange={this.selectVendorChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email">Tanggal Invoice</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput
                    type="date"
                    id="invoiceDate"
                    name="invoiceDate"
                    onChange={this.onChange}
                    value={this.state.invoiceDate}
                  ></CInput>
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="periode">Periode</CLabel>
                </CCol>
                <CCol sm="4">
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
                <CCol sm="4">
                  <CInput
                    name="ppn"
                    placeholder="ppn"
                    onChange={this.onChange}
                    value={this.state.ppn}
                  />
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="telepon">Materai</CLabel>
                </CCol>
                <CCol sm="4">
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
               <form onChange={this.handleChange}>
            <div class="justify-content-center">
              <Label > Man Power</Label>
              <ParameterList 
                add={this.addNewRow}
                delete={this.clickOnDelete}
                parameterList={parameterList}/>
                {/* {JSON.stringify(parameterList)} */}
                </div>
                 </form>   
                </CModalBody>
                <CModalFooter>
                <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={this.createInvoiceOutsourcing}
              >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>{" "}
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={this.toggleCreate}
              >
                <CIcon name="cil-ban" /> Cancel
              </CButton>
                </CModalFooter>
              </CModal>
            <CModal size="xl" show={this.state.showUpdateModal} onclose={this.toggleUpdate}>
              <CModalHeader> Edit Invoice Air</CModalHeader>
              <CModalBody>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="invoiceNo">Invoice No</CLabel>
                </CCol>
                <CCol xs="4">
                  <CInput
                    name="invoiceNo"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.invoiceNo}
                    disabled
                  />
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="cinemaId">Outlet</CLabel>
                </CCol>
                <CCol sm="4">
                  <Select
                    name="cinemaId"
                    options={optionCinema}
                    value={optionCinema.filter((opt)=>opt.value===this.state.cinemaId)}
                    onChange={this.selectCinemaChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="vendor"> Vendor</CLabel>
                </CCol>
                <CCol sm="4">
                  <Select
                    name="vendorId"
                    options={optionVendor}
                    value={optionVendor.filter((opt)=>opt.value===this.state.vendorId)}
                    onChange={this.selectVendorChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email">Tanggal Invoice</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput
                    type="date"
                    id="invoiceDate"
                    name="invoiceDate"
                    onChange={this.onChange}
                    value={this.state.invoiceDate}
                  ></CInput>
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="periode">Periode</CLabel>
                </CCol>
                <CCol sm="4">
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
                <CCol sm="4">
                  <CInput
                    name="ppn"
                    placeholder="ppn"
                    onChange={this.onChange}
                    value={this.state.ppn}
                  />
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="telepon">Materai</CLabel>
                </CCol>
                <CCol sm="4">
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
                {/* <form onChange={this.handleChange}>
              <ParameterList
                add={this.addNewRow}
                delete={this.clickOnDelete}
                parameterList={parameterList}/>
                {/* {JSON.stringify(this.state.parameterList)} */}
                {/* </form>  */}
              </CFormGroup>

              </CModalBody>
              <CModalFooter>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={this.updateInvoiceOutsourcing}
              >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>{" "}
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={this.toggleUpdate}
              >
                <CIcon name="cil-ban" /> Cancel
              </CButton>
              </CModalFooter>
              </CModal>
          </Card>
        </Col>
      </Row>
    );
  }
}
