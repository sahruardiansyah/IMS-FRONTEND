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
  CTextarea,
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
} from "reactstrap";
import VendorService from "src/services/VendorService";
export default class ListAllVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: [],
      show: false,
      vendorId: null,
      showCreateModal: false,
      showUpdateModal: false,
      data: {
        id:"",
        vendorAddress: "",
        vendorName: "",
        vendorRepresentation: "",
        email: "",
        kota: "",
        postCode: "",
        telepon: ""
      }
    };
    this.deleteVendor = this.deleteVendor.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleUpdate=this.toggleUpdate.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.showUpdateModal= this.showUpdateModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createVendor=this.createVendor.bind(this);
    this.updateVendor=this.updateVendor.bind(this);
  }

  updateVendor = (e) => {
    e.preventDefault();
    let vendor = {
      vendorAddress: this.state.data.vendorAddress,
      vendorName: this.state.data.vendorName,
      vendorRepresentation: this.state.data.vendorRepresentation,
      email: this.state.data.email,
      kota: this.state.data.kota,
      postCode: this.state.data.postCode,
      telepon: this.state.data.telepon,
    };
    console.log(this.state.vendorId);
    VendorService.updateVendor(vendor,this.state.vendorId).then((res) => {
      this.setState({showUpdateModal: false})
      console.log(res);
      this.reloadTable();
    });   
  };

  onChange(e) {
    let newData = {
      vendorAddress: this.state.data.vendorAddress,
      vendorName: this.state.data.vendorName,
      vendorRepresentation: this.state.data.vendorRepresentation,
      email: this.state.data.email,
      kota: this.state.data.kota,
      postCode: this.state.data.postCode,
      telepon: this.state.data.telepon,
    };
    newData[e.target.name] = e.target.value;
    this.setState({data: newData});
    console.log(newData);
  }

  createVendor = (e) => {
    e.preventDefault();
    let Vendor = {
      vendorAddress: this.state.data.vendorAddress,
      vendorName: this.state.data.vendorName,
      vendorRepresentation: this.state.data.vendorRepresentation,
      email: this.state.data.email,
      kota: this.state.data.kota,
      postCode: this.state.data.postCode,
      telepon: this.state.data.telepon,
    };
    VendorService.createVendor(Vendor).then((res) => {
      this.setState({ showCreateModal: false })
      return this.reloadTable();
    });
  };

  toggleUpdate() {
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
    });
  }

  showUpdateModal(id) {
    VendorService.getVendorById(id).then((res) => {
      let currentVendor = res.data;
      this.setState({
        vendorId: currentVendor.id,
        showUpdateModal: !this.state.showUpdateModal,
        data:{
        id:currentVendor.id,
        vendorAddress: currentVendor.vendorAddress,
        vendorName: currentVendor.vendorName,
        vendorRepresentation: currentVendor.vendorRepresentation,
        email: currentVendor.email,
        kota: currentVendor.kota,
        postCode: currentVendor.postCode,
        telepon: currentVendor.telepon,
      }
      });
      console.log(this.state.data.id)
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
    });
  }
  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }
  
  reloadTable() {
    VendorService.getVendor().then((res) => {
      this.setState({ vendors: res.data });
    });
  }
  componentDidMount() {
    this.reloadTable();

    
  }
  showModal(id) {
    this.setState({
      show: !this.state.show,
      vendorId: id,
    });
    console.log(id);
  }

  deleteVendor(id) {
    VendorService.deleteVendor(id).then((res) => {
      this.setState({
        vendors: this.state.vendors.filter((vendor) => vendor.id !== id),
        show: false,
      });
    });
  }

  render() {
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h2>Daftar Vendor</h2>
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
                      Add Vendor With Modal
                    </CButton>
                  </td>
                </thead>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>CITY</td>
                    <td>ADDRESS</td>
                    <td>ACTION</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td> {vendor.id}</td>
                      <td> {vendor.vendorName}</td>
                      <td> {vendor.kota}</td>
                      <td> {vendor.vendorAddress}</td>
                      <td>
                        <Button
                          color="success"
                          onClick={() => this.showUpdateModal(vendor.id)}
                        >
                          Update
                        </Button>
                        <Button
                          color="danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.showModal(vendor.id)}
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
              <CModalHeader closeButton>Deleting vendor</CModalHeader>
              <CModalBody>
                Apa anda yakin ingin menghapus ?{this.state.vendorName}{" "}
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="primary"
                  onClick={() => this.deleteVendor(this.state.vendorId)}
                >
                  Delete
                </CButton>{" "}
                <CButton color="secondary" onClick={this.toggle}>
                  Cancel
                </CButton>
              </CModalFooter>{" "}
            </CModal>
            <CModal
              show={this.state.showCreateModal}
              onClose={this.toggleCreate}
            >
              <CModalHeader> Add New Vendor</CModalHeader>
              <CModalBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="Vendor-name">Vendor Name</CLabel>
                  </CCol>
                  <CCol xs="8">
                    <CInput
                      name="vendorName"
                      type="text"
                      onChange={this.onChange}
                      value={this.state.data.vendorName}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="vendor-representation">
                      {" "}
                      Vendor Representation
                    </CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      // id="vendor-representation"
                      name="vendorRepresentation"
                      onChange={this.onChange}
                      value={this.state.data.vendorRepresentation}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email">Email</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="email"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.data.email}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="telepon">No. Tel / HP</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="telepon"
                      name="telepon"
                      onChange={this.onChange}
                      value={this.state.data.telepon}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="alamat">Alamat</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CTextarea
                      name="vendorAddress"
                      // id="alamat"
                      rows="3"
                      placeholder="Alamat"
                      onChange={this.onChange}
                      value={this.state.data.vendorAddress}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="kota">Kota</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="kota"
                      name="kota"
                      onChange={this.onChange}
                      value={this.state.data.kota}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="kode-post">Kode Pos</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="kode-post"
                      name="postCode"
                      onChange={this.onChange}
                      value={this.state.data.postCode}
                    />
                  </CCol>
                </CFormGroup>
              </CModalBody>
              <CModalFooter>
              <CButton
                    type="submit"
                    size="sm"
                    color="primary"
                    onClick={this.createVendor}
                  >
                    <CIcon name="cil-scrubber" /> Submit
                  </CButton>{" "}
                  <CButton
                    type="reset"
                    size="sm"
                    color="danger"
                    onClick={this.toggleCreate}>
                    <CIcon name="cil-ban" /> Cancel
                  </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              show={this.state.showUpdateModal}
              onClose={this.toggleUpdate}
            >
              <CModalHeader> Edit Vendor</CModalHeader>
              <CModalBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="Vendor-name">Vendor Name</CLabel>
                  </CCol>
                  <CCol xs="8">
                    <CInput
                      name="vendorName"
                      type="text"
                      onChange={this.onChange}
                      value={this.state.data.vendorName}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="vendor-representation">
                      {" "}
                      Vendor Representation
                    </CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      // id="vendor-representation"
                      name="vendorRepresentation"
                      onChange={this.onChange}
                      value={this.state.data.vendorRepresentation}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email">Email</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="email"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.data.email}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="telepon">No. Tel / HP</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="telepon"
                      name="telepon"
                      onChange={this.onChange}
                      value={this.state.data.telepon}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="alamat">Alamat</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CTextarea
                      name="vendorAddress"
                      // id="alamat"
                      rows="3"
                      placeholder="Alamat"
                      onChange={this.onChange}
                      value={this.state.data.vendorAddress}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="kota">Kota</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="kota"
                      name="kota"
                      onChange={this.onChange}
                      value={this.state.data.kota}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="kode-post">Kode Pos</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="kode-post"
                      name="postCode"
                      onChange={this.onChange}
                      value={this.state.data.postCode}
                    />
                  </CCol>
                </CFormGroup>
              </CModalBody>
              <CModalFooter>
              <CButton
                    type="submit"
                    size="sm"
                    color="primary"
                    onClick={this.updateVendor}
                  >
                    <CIcon name="cil-scrubber" /> Update
                  </CButton>{" "}
                  <CButton
                    type="reset"
                    size="sm"
                    color="danger"
                    onClick={this.toggleUpdate}>
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
