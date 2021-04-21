import CIcon from "@coreui/icons-react";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader
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
      vendorId: null
    };
    this.deleteVendor = this.deleteVendor.bind(this);
    this.addVendor = this.addVendor.bind(this);
    this.updateVendor = this.updateVendor.bind(this);
    this.toggle = this.toggle.bind(this)

  }
  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }
  showModal(id) {
    this.setState({
      show: !this.state.show
      , vendorId: id
    })
    console.log(id);
  }
  addVendor() {
    this.props.history.push("/setting/add-vendors");
  }
  updateVendor(id) {
    this.props.history.push(`/setting/update-vendors/${id}`);
  }
  deleteVendor(id) {
      VendorService.deleteVendor(id).then((res) => {
        this.setState({
          vendors: this.state.vendors.filter(
            (vendor) => vendor.id !== id
          ),show: false
        });
      });
  }

  componentDidMount() {
    VendorService.getVendor().then((res) => {
      this.setState({ vendors: res.data });
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
                      type="submit" size="sm"
                      color="primary"
                      style={{ marginLeft: "10px" }}
                      onClick={this.addVendor}
                    >
                      Add Vendor
                      <CIcon name="cil-plus"/>
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
                          onClick={() => this.updateVendor(vendor.id)}
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
              <CModalBody>Apa anda yakin ingin menghapus ?{this.state.vendorName}  </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => this.deleteVendor(this.state.vendorId)} >Delete</CButton>{" "}
                <CButton color="secondary" onClick={this.toggle} >
                  Cancel
                            </CButton>
              </CModalFooter>{" "}
            </CModal>
          </Card>
        </Col>
      </Row>
    );
  }
}
