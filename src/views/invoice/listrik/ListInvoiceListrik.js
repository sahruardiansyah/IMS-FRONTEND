import CIcon from "@coreui/icons-react";
import {
  CButton,
  CInput
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
import InvoiceListrikService from "src/services/InvoiceListrikService";
export default class ListInvoiceListrik extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: [],
    };
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.addInvoice = this.addInvoice.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);

  }
  addInvoice() {
    this.props.history.push("/invoice/listrik/add-invoice");
  }
  updateInvoice(id) {
    this.props.history.push(`/invoice/listrik/${id}`);
  }
  deleteInvoice(id) {
    if (window.confirm("Apakah anda yakin ingin menghapus ?")) {
      InvoiceListrikService.deleteInvoice(id).then((res) => {
        this.setState({
          invoice: this.state.invoice.filter(
            (invoice) => invoice.id !== id
          ),
        });
      });
    }
  }

  componentDidMount() {
    InvoiceListrikService.getInvoiceListrik().then((res) => {
      this.setState({ invoice: res.data });
    });
  }
  render() {
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h2>Daftar Invoice Listrik</h2>
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
                      onClick={this.addInvoice}
                    >
                      Add Invoice
                      <CIcon name="cil-plus"/>
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
                      <td> {null}</td>
                      <td> {inv.invoiceDate}</td>
                      <td> {inv.invoicePeriode}</td>
                      <td>
                      <Button
                          color="success"
                          onClick={() => this.updateInvoice(inv.id)}
                        >
                          Update
                        </Button>
                        <Button
                          color="danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.deleteInvoice(inv.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
