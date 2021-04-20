import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,

} from "@coreui/react";
import { DocsLink } from "src/reusable";
// import CIcon from "@coreui/icons-react";

const Modals = () => {
  const [customer, setData] = useState({
    customerAddress: "",
    customerName: "",
    customerRepresentation: "",
    email: "",
    kota: "",
    postCode: "",
    telepon: "",
  });

  // function submit(e) {
  //   e.prevenDefault();
  // }

  function handle(e) {
    const newData = { ...customer };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Bootstrap Modals
            <DocsLink name="CModal" />
          </CCardHeader>
          <CCardBody>
            <CButton
              color="primary"
              onClick={() => setData(!customer)}
              className="mr-1"
            >
              AddCustomer
            </CButton>
            <CModal show={customer} onClose={setData}>
              <CModalHeader closeButton>
                <CModalTitle>Add Customer</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="form-group">
                  <label> Customer Name : </label>
                  <input
                    name="customerName"
                    className="form-control"
                    value={customer.customerName}
                    onChange={(e)=>handle(e)}
                  />
                </div>
                <div className="form-group">
                  <label> CUstomer Representation : </label>
                  <input
                    name="customerRepresentation"
                    className="form-control"
                    value={customer.customerRepresentation}
                    onChange={(e)=>handle(e)}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary">Do Something</CButton>{" "}
                <CButton color="secondary" onClick={() => setData(false)}>
                  Cancel
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Modals;
