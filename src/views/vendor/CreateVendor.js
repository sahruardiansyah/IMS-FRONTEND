import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow ,CCardFooter,CButton, CTextarea} from "@coreui/react";
import VendorService from "src/services/VendorService";
import CIcon from "@coreui/icons-react";

export default class CreateVendor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          vendorAddress: "",
          vendorName: "",
          vendorRepresentation: "",
          email: "",
          kota: "",
          postCode: "",
          telepon: "",
        };
        this.createVendor = this.createVendor.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onChange = this.onChange.bind(this);
      }
   
       onChange(e) {
        let newData = { 
          vendorAddress: this.state.vendorAddress,
          vendorName: this.state.vendorName,
          vendorRepresentation: this.state.vendorRepresentation,
          email: this.state.email,
          kota: this.state.kota,
          postCode: this.state.postCode,
          telepon: this.state.telepon
        };
        newData[e.target.name] = e.target.value;
        this.setState(newData);
        console.log(newData);
      }
      // componentDidMount() {
      //   VendorService.getVendorById(this.state.id).then((res) => {
      //     let currentVendor = res.data;
      //     this.setState({
      //       vendorAddress: currentVendor.VendorAddress,
      //       vendorName: currentVendor.VendorName,
      //       vendorRepresentation: currentVendor.VendorRepresentation,
      //       email: currentVendor.email,
      //       kota: currentVendor.kota,
      //       postCode: currentVendor.postCode,
      //       telepon: currentVendor.telepon,
      //     });
      //   });
      // }
      
      createVendor = (e) => {
        e.preventDefault();
        let Vendor = {
          vendorAddress: this.state.vendorAddress,
          vendorName: this.state.vendorName,
          vendorRepresentation: this.state.vendorRepresentation,
          email: this.state.email,
          kota: this.state.kota,
          postCode: this.state.postCode,
          telepon: this.state.telepon,
        };
        VendorService.createVendor(Vendor).then((res) => {
          this.props.history.push("/setting/vendors");
          console.log(res);
        });
      };
    
      cancel=e=>{
                  this.props.history.push('/setting/vendors')
              }
      render() {
        return (
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <h3>Add Vendor</h3>
                </CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="Vendor-name">Vendor Name</CLabel>
                    </CCol>
                    <CCol sm="4">
                      <CInput
                        name="vendorName"
                        type="text"
                        onChange={this.onChange}
                        value={this.state.vendorName}
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
                    <CCol sm="4">
                      <CInput
                        // id="vendor-representation"
                        name="vendorRepresentation"
                        onChange={this.onChange}
                        value={this.state.vendorRepresentation}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email">Email</CLabel>
                    </CCol>
                    <CCol sm="4">
                      <CInput
                        id="email"
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="telepon">No. Tel / HP</CLabel>
                    </CCol>
                    <CCol sm="4">
                      <CInput
                        id="telepon"
                        name="telepon"
                        onChange={this.onChange}
                        value={this.state.telepon}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="alamat">Alamat</CLabel>
                    </CCol>
                    <CCol sm="4">
                      <CTextarea
                        name="vendorAddress"
                        // id="alamat"
                        rows="3"
                        placeholder="Alamat"
                        onChange={this.onChange}
                        value={this.state.vendorAddress}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="kota">Kota</CLabel>
                    </CCol>
                    <CCol sm="4">
                      <CInput
                        id="kota"
                        name="kota"
                        onChange={this.onChange}
                        value={this.state.kota}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="kode-post">Kode Pos</CLabel>
                    </CCol>
                    <CCol sm="4">
                      <CInput
                        id="kode-post"
                        name="postCode"
                        onChange={this.onChange}
                        value={this.state.postCode}
                      />
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
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