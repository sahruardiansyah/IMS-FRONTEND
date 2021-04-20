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
import CinemaService from "src/services/CinemaService";

export default class CreateCinema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nama: "",
      email: "",
      noHp: "",
      tipe: "",
      kota: "",
      alamat: "",
      keterangan: "",
    };
    this.createCinema = this.createCinema.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let newData = {
      id: this.state.id,
      nama: this.state.nama,
      email: this.state.email,
      noHp: this.state.noHp,
      tipe: this.state.tipe,
      kota: this.state.kota,
      alamat: this.state.alamat,
      keterangan: this.state.keterangan,
    };
    newData[e.target.name] = e.target.value;
    this.setState(newData);
    console.log(newData);
  }

  createCinema = (e) => {
    e.preventDefault();
    let cinema = {
      id: this.state.id,
      nama: this.state.nama,
      email: this.state.email,
      noHp: this.state.noHp,
      tipe: this.state.tipe,
      kota: this.state.kota,
      alamat: this.state.alamat,
      keterangan: this.state.keterangan,
    };
    CinemaService.createCinema(cinema).then((res) => {
      this.props.history.push("/setting/cinema");
      console.log(res);
    });
  };

  cancel = (e) => {
    this.props.history.push("/setting/cinema");
  };
  render() {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Add Cinema</h3>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="Vendor-name">Bioskop ID</CLabel>
                </CCol>
                <CCol xs="2">
                  <CInput
                    name="id"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.id}
                  />
                </CCol>
                <CCol md="1">
                  <CLabel htmlFor="Vendor-name">Nama</CLabel>
                </CCol>
                <CCol sm="4">
                  <CInput
                    name="nama"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.nama}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email"> Email</CLabel>
                </CCol>
                <CCol sm="2">
                  <CInput
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </CCol>
                <CCol md="1">
                  <CLabel htmlFor="noHp"> No. Hp</CLabel>
                </CCol>
                <CCol sm="3">
                  <CInput
                    // id="vendor-representation"
                    name="noHp"
                    onChange={this.onChange}
                    value={this.state.noHp}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email">Tipe</CLabel>
                </CCol>
                <CCol sm="2">
                  <CSelect name="select">
                    <option value="0">Please select</option>
                  </CSelect>
                </CCol>
                <CCol md="1">
                  <CLabel htmlFor="email">Kota</CLabel>
                </CCol>
                <CCol sm="2">
                  {/* <CInput
                        id="email"
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
                      /> */}
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
                    value={this.state.alamat}
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
