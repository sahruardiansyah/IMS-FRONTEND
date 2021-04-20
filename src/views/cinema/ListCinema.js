import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
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
    };
    this.deleteCinema = this.deleteCinema.bind(this);
    this.addCinema = this.addCinema.bind(this);
    this.updateCinema = this.updateCinema.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle(id) {
    this.setState({ show: !this.state.show,
    cinemaId: id  });
  }
  addCinema() {
    this.props.history.push("/setting/add-cinema");
  }
  updateCinema(id) {
    this.props.history.push(`/setting/update-cinema/${id}`);
  }
  deleteCinema(id) {

      CinemaService.deleteCinema(id).then((res) => {
        this.setState({
          cinemas: this.state.cinemas.filter((cinema) => cinema.id !== id),
          show: false
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
                    <CInput onChange={this.onChange}></CInput>
                  </td>
                  <td>
                    <CButton color="primary">Search</CButton>
                    <CButton
                      type="submit"
                      size="sm"
                      color="primary"
                      style={{ marginLeft: "10px" }}
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
                          onClick={this.toggle(cinema.id)}
                          // onClick={() => this.deleteCinema(cinema.id)}
                        >
                          Delete
                        </Button>
                        <CModal show={this.state.show} onClose={this.toggle(cinema.id)}>
                          <CModalHeader closeButton>Deleting cinema</CModalHeader>
                          <CModalBody>Apa anda yakin ingin menghapus {this.state.cinemaId}?</CModalBody>
                          <CModalFooter>
                            <CButton color="primary"  onClick={() => this.deleteCinema(cinema.id)}>Delete</CButton>{" "}
                            <CButton color="secondary" onClick={this.toggle(cinema.id)}>
                              Cancel
                            </CButton>
                          </CModalFooter>{" "}
                        </CModal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              ;
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
