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
  CSelect,
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
import CinemaService from "src/services/CinemaService";
export default class ListAllCinema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cinemas: [],
      show: false,
      cinemaId: null,
      showCreateModal: false,
      data: {
        id: "",
        nama: "",
        email: "",
        noHp: "",
        tipe: "",
        kota: "",
        alamat: "",
        keterangan: "",
      }
    };
    this.deleteCinema = this.deleteCinema.bind(this);
    this.addCinema = this.addCinema.bind(this);
    this.updateCinema = this.updateCinema.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createCinema = this.createCinema.bind(this);
  }

  onChange(e) {
    let newData = {
      id: this.state.data.id,
      nama: this.state.data.nama,
      email: this.state.data.email,
      noHp: this.state.data.noHp,
      tipe: this.state.data.tipe,
      kota: this.state.data.kota,
      alamat: this.state.data.alamat,
      keterangan: this.state.data.keterangan,
    };
    newData[e.target.name] = e.target.value;
    this.setState(newData);
    console.log(newData);
  }
  createCinema = (e) => {
    e.preventDefault();
    let bioskop = {
      id: this.state.data.id,
      nama: this.state.data.nama,
      email: this.state.data.email,
      noHp: this.state.data.noHp,
      tipe: this.state.data.tipe,
      kota: this.state.data.kota,
      alamat: this.state.data.alamat,
      keterangan: this.state.data.keterangan,
    };
    CinemaService.createCinema(bioskop).then((res) => {
      this.setState({showCreateModal: false})
      console.log(res);
    });
  };
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
    });
  }
  addCinema() {
    this.props.history.push("/setting/add-cinema");
  }
  updateCinema(id) {
    this.props.history.push(`/setting/update-cinema/${id}`);
  }

  showModal(id) {
    this.setState({
      show: !this.state.show,
      cinemaId: id,
    });
    console.log(id);
  }

  deleteCinema(id) {
    CinemaService.deleteCinema(id).then((res) => {
      this.setState({
        cinemas: this.state.cinemas.filter((cinema) => cinema.id !== id),
        show: false,
      });
    });
  }

  componentDidMount() {
    CinemaService.getCinema().then((res) => {
      this.setState({ cinemas: res.data });
    });
  }
  render() {
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h2>Daftar Cinema</h2>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <td>
                    <CInput ></CInput>
                  </td>
                  <td>
                    <CButton color="primary">Search</CButton>
                    <CButton
                      type="submit"
                      color="primary"
                      style={{ marginLeft: "10px" }}
                      onClick={this.showCreateModal}
                    >
                      Add Cinema With Modal
                    </CButton>
                  </td>
                  <td>                    
                    <CButton
                      type="submit"
                      color="primary"
                      // style={{ marginLeft: "10px" }}
                      onClick={this.addCinema}
                    >
                      Add Cinema 
                    </CButton>
                    </td>
                </thead>
                <thead>
                  <tr>
                    <td>Bioskop ID</td>
                    <td>Bioskop </td>
                    <td>KOTA</td>
                    <td>No. Telp / Hp</td>
                    <td>Email</td>
                    <td>Premiere</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cinemas.map((cinema) => (
                    <tr key={cinema.id}>
                      <td> {cinema.id}</td>
                      <td> {cinema.nama}</td>
                      <td> {cinema.kota}</td>
                      <td> {cinema.noHp}</td>
                      <td> {cinema.email}</td>
                      <td> {cinema.isPremiere}</td>
                      <td>
                        <Button
                          color="success"
                          onClick={() => this.updateCinema(cinema.id)}
                        >
                          Update
                        </Button>
                        <Button
                          color="danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.showModal(cinema.id)}
                          // onClick={() => this.deleteCinema(cinema.id)}
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
              <CModalHeader closeButton>Deleting cinema</CModalHeader>
              <CModalBody>
                Apa anda yakin ingin menghapus ? {this.state.cinemaId}
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="primary"
                  onClick={() => this.deleteCinema(this.state.cinemaId)}
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
              onClose={this.toggleCreate}>
            <CModalHeader>Add New Cinema</CModalHeader>
              <CModalBody> <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="id">Bioskop ID</CLabel>
                </CCol>
                <CCol xs="4">
                  <CInput
                    name="id"
                    id="id"
                    onChange={this.onChange}
                    value={this.state.data.id}
                  />{this.state.data.id}
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="name">Nama</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput
                    name="nama"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.data.nama}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email"> Email</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput
                    name="email"
                    onChange={this.onChange}
                    value={this.state.data.email}
                  />
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="noHp"> No. Hp</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput
                    // id="vendor-representation"
                    name="noHp"
                    onChange={this.onChange}
                    value={this.state.data.noHp}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email">Tipe</CLabel>
                </CCol>
                <CCol sm="4">
                  <CSelect name="select">
                    <option value="0">Please select</option>
                  </CSelect>
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="email">Kota</CLabel>
                </CCol>
                <CCol sm="4">
                  <CSelect name="select">
                    <option value="0">Please select</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="telepon">Alamat</CLabel>
                </CCol>
                <CCol sm="4">
                  <CTextarea
                    name="alamat"
                    placeholder="Alamat"
                    onChange={this.onChange}
                    value={this.state.data.alamat}
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
                    value={this.state.data.keterangan}
                  />
                </CCol>
              </CFormGroup>
              </CModalBody>
              <CModalFooter>
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
                onClick={this.toggleCreate}
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
