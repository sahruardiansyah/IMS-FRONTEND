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
import TheaterService from "src/services/TheaterService";
import Select from "react-select";
export default class TheaterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theaters: [],
      show: false,
      theaterId: null,
      showCreateModal: false,
      showUpdateModal: false,
      lobOption:[],
      selectedLob:"",
      data: {
        id:"",
        cinemaCode: "",
        theaterCode: "",
        theaterName: "",
        lobCode: "",

      }
    };
    this.deleteTheater = this.deleteTheater.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleUpdate=this.toggleUpdate.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.showUpdateModal= this.showUpdateModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createTheater=this.createTheater.bind(this);
    this.updateTheater=this.updateTheater.bind(this);
    this.selectLobChange = this.selectLobChange.bind(this);
  }

  updateTheater = (e) => {
    e.preventDefault();
    let theater = {
      cinemaCode: this.state.data.cinemaCode,
      theaterCode: this.state.data.theaterCode,
      theaterName: this.state.data.theaterName,
      lobCode: this.state.selectedLob
    };
    console.log(this.state.theaterId);
    console.log(theater);
    TheaterService.updateTheater(theater,this.state.theaterId).then((res) => {
      this.setState({showUpdateModal: false})
      console.log(res);
      this.reloadTable();
    });   
  };

  onChange(e) {
    let newData = {
        cinemaCode: this.state.data.cinemaCode,
        theaterCode: this.state.data.theaterCode,
        theaterName: this.state.data.theaterName,
        lobCode: this.state.data.lobCode,
        
    };
    newData[e.target.name] = e.target.value;
    this.setState({data: newData});
    console.log(newData);
  }

 getLobOptionsData(){
     TheaterService.getLob().then((res)=>{
         this.setState({lobOption: res.data})
     })
     console.log(this.state.lobOption)
 }

 selectLobChange = (e) => {
     this.setState({ selectedLob: e.value})
     console.log("Lob selected "+this.state.selectedLob);
 }

  createTheater = (e) => {
    e.preventDefault();
    let theater = {
        cinemaCode: this.state.data.cinemaCode,
        theaterCode: this.state.data.theaterCode,
        theaterName: this.state.data.theaterName,
        lobCode: this.state.selectedLob
    };
    TheaterService.createTheater(theater).then((res) => {
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
    TheaterService.getTheaterById(id).then((res) => {
      let currentTheater = res.data;
      this.setState({
        theaterId: currentTheater.id,
        showUpdateModal: !this.state.showUpdateModal,
        selectedLob: currentTheater.lobCode,
        data:{
        cinemaCode: currentTheater.cinemaCode,
        theaterCode: currentTheater.theaterCode,
        theaterName: currentTheater.theaterName,
        lobCode: currentTheater.lobCode
      }
      });
      console.log(currentTheater)

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
      data: {
        id:"",
        cinemaCode: "",
        theaterCode: "",
        theaterName: "",
        lobCode: "",
      }
    });
  }
  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }
  
  reloadTable() {
    TheaterService.getTheater().then((res) => {
      this.setState({ theaters: res.data });
    });
  }
  componentDidMount() {
    this.reloadTable();
    this.getLobOptionsData();

    
  }
  showModal(id) {
    this.setState({
      show: !this.state.show,
      theaterId: id,
    });
    console.log(id);
  }

  deleteTheater(id) {
    TheaterService.deleteTheater(id).then((res) => {
      this.setState({
        theaters: this.state.theaters.filter((theater) => theater.id !== id),
        show: false,
      });
    });
  }

  render() {
      let options= this.state.lobOption.map(function (lob){
          return {value: lob.id, label: lob.lobName};
      })
      console.log(options)
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h2>Daftar Theater</h2>
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
                      Add Theater 
                    </CButton>
                  </td>
                </thead>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Theater Code</td>
                    <td>Cinema Code</td>
                    <td>Theater Name</td>
                    <td>Lob</td>
                    <td>ACTION</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.theaters.map((theater) => (
                    <tr key={theater.id}>
                      <td> {theater.id}</td>
                      <td> {theater.theaterCode}</td>
                      <td> {theater.cinema}</td>
                      <td> {theater.theaterName}</td>
                      <td> {theater.lobCode}</td>
                      <td>
                        <Button
                          color="success"
                          onClick={() => this.showUpdateModal(theater.id)}
                        >
                          Update
                        </Button>
                        <Button
                          color="danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.showModal(theater.id)}
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
              <CModalHeader closeButton>Deleting Theater</CModalHeader>
              <CModalBody>
                Apa anda yakin ingin menghapus ?{this.state.theaterName}{" "}
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="primary"
                  onClick={() => this.deleteTheater(this.state.theaterId)}
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
              <CModalHeader> Add New Theater</CModalHeader>
              <CModalBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="theaterCOde">Theater Code</CLabel>
                  </CCol>
                  <CCol xs="8">
                    <CInput
                      name="theaterCode"
                      type="text"
                      onChange={this.onChange}
                      value={this.state.data.theaterCode}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="theaterName">
                      {" "}
                      Theater Name
                    </CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      name="theaterName"
                      onChange={this.onChange}
                      value={this.state.data.theaterName}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="cinemaCode">Cinema Code</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      name="cinemaCode"
                      onChange={this.onChange}
                      value={this.state.data.cinemaCode}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="lob">LOB</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <Select 
                    options={options} 
                    name="selectedLob"
                    onChange={this.selectLobChange}
                    value={options.find(obj => obj.value === this.state.selectedLob)}
                    ></Select>
                  </CCol>
                </CFormGroup>
              
              </CModalBody>
              <CModalFooter>
              <CButton
                    type="submit"
                    size="sm"
                    color="primary"
                    onClick={this.createTheater}
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
              <CModalHeader> Edit Theater</CModalHeader>
              <CModalBody>
              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="theaterCOde">Theater Code</CLabel>
                  </CCol>
                  <CCol xs="8">
                    <CInput
                      name="theaterCode"
                      type="text"
                      onChange={this.onChange}
                      value={this.state.data.theaterCode}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="theaterName">
                      {" "}
                      Theater Name
                    </CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      name="theaterName"
                      onChange={this.onChange}
                      value={this.state.data.theaterName}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="cinemaCode">Cinema Code</CLabel>
                  </CCol>
                  <CCol sm="8">
                    <CInput
                      id="cinemaCode"
                      name="cinemaCode"
                      onChange={this.onChange}
                      value={this.state.data.cinemaCode}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="lob">LOB</CLabel>
                  </CCol>
                  <CCol sm="8">
                  <Select 
                    options={options} 
                    name="selectedLob"
                    onChange={this.selectLobChange}
                    value={options.find(obj => obj.value === this.state.selectedLob)}
                    ></Select>
                    {this.state.selectedLob}
                  </CCol>
                </CFormGroup>
              </CModalBody>
              <CModalFooter>
              <CButton
                    type="submit"
                    size="sm"
                    color="primary"
                    onClick={this.updateTheater}
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
