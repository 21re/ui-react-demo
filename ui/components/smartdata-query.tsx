import * as React from "react";
import {
  Container,
  Table,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Progress
} from "reactstrap";
import { bind } from 'decko'
import { Address } from "../models/address"
import { SmartdataResult, Level0Data, CellData } from "../models/smartdata";
import { State } from "../reducers/state";
import { BoundActions, actionBinder } from "../actions/bindable";
import { connect } from "react-redux";
import { NavigationPage } from "../actions/navigation";

export interface SmartDataQueryState {
  address: Partial<Address>
}

export type Level0DataKeys = keyof Level0Data;
export type CellDataKeys = keyof CellData;

const mapStateToProps = (state: State) => ({
  token: state.demoState.token,
  smartdata: state.demoState.smartdata,
  loading: state.demoState.smartdataLoading,
});

type SmartDataQueryProps = ReturnType<typeof mapStateToProps> & BoundActions;

export class SmartDataQueryImpl extends React.Component<SmartDataQueryProps, SmartDataQueryState> {
  constructor(props: SmartDataQueryProps) {
    super(props);

    this.state = {
      address: {
        route: "Hausvogteiplatz",
        streetNumber: "11",
        postalCode: "10117",
        locality: "Berlin",
        country: "DE",
      },
    }
  }

  isAddress(value: Partial<Address>): value is Address {
    return value.country !== undefined && value.locality !== undefined
      && value.postalCode !== undefined && value.route !== undefined
      && value.streetNumber !== undefined;
  }

  submit() {
    this.isAddress(this.state.address) && this.props.querySmartData(this.state.address)
  }

  @bind
  updateAddress(field: keyof Address): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        address: {
          ...this.state.address,
          [field]: event.target.value,
        },
      })
    }
  }

  render() {
    return (
      <>
        <Row>
          <Col xs="12">
            <Breadcrumb>
              <BreadcrumbItem > <a href="#" onClick={(ev) => { ev.preventDefault(); this.props.navigateTo(NavigationPage.DemoIndex, { token: this.props.token || "" }) }}>Home</a></BreadcrumbItem>
              <BreadcrumbItem active>Smart Data</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        {
          this.props.smartdata
            ? this.renderSmartdataResult(this.props.smartdata)
            : this.renderQueryForm()
        }
      </>
    )
  }

  renderSmartdataResult(result: SmartdataResult) {
    const { address, level0 } = result;
    const translation: { [P in Level0DataKeys]: string } = {
      cellId: "",
      cellSaleML: "Buying price (Machine Learning)",
      cellSaleCP: "Buying price (Comparables)",
      cellRentML: "Rent (Machine Learning)",
      cellRentCP: "Rent (Comparables)",
      cellMultiplierML: "Multiplier (Machine Learning)",
      cellMultiplierCP: "Multiplier (Comparables)",
      cellGrossInitialYieldML: "Gross Initial Yield (Machine Learning)",
      cellGrossInitialYieldCP: "Gross Initial Yield (Comparables)",
    };

    return (
      <>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <strong>{address.route} {address.streetNumber}</strong><br />
                <em>{address.postalCode} {address.locality}, {address.country}</em>
              </Col>
              <Col>
                <Button onClick={() => this.props.resetSmartData()}>Query new Address</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <br />
        <h3>Results</h3>
        <Container>
          {
            Object.keys(level0).map((e: Level0DataKeys) => {
              if (e === "cellId") return null;

              return (
                <>
                  <strong>{translation[e]}</strong>
                  <Table>
                    {Object.keys(level0[e]).map((q: CellDataKeys) => <tr><td>{q}</td><td>{level0[e][q]}</td></tr>)}
                  </Table>
                </>
              )
            })
          }
        </Container>
      </>
    )
  }

  renderQueryForm() {
    return (
      <>
        <h3>Query Smartdata</h3>
        <Form>
          <Row>
            <Col xs="4">
              <FormGroup>
                <Label>Zip Code</Label>
                <Input type="number" name="zip" value={this.state.address.postalCode} id="zip" onChange={this.updateAddress("postalCode")} />
              </FormGroup>
            </Col>
            <Col xs="8">
              <FormGroup>
                <Label>City</Label>
                <Input name="city" id="city" value={this.state.address.locality} onChange={this.updateAddress("locality")} />
              </FormGroup>
            </Col>
            <Col xs="8">
              <FormGroup>
                <Label>Street</Label>
                <Input name="street" id="street" value={this.state.address.route} onChange={this.updateAddress("route")} />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label>Number</Label>
                <Input name="streetnumber" id="streetnumber" value={this.state.address.streetNumber} onChange={this.updateAddress("streetNumber")} />
              </FormGroup>
            </Col>
            <Col xs="12">
              <FormGroup>
                <Label>Country</Label>
                <Input type="select" name="country" id="country" value={this.state.address.country} onChange={this.updateAddress("country")}>
                  <option value="DE">Germany</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="12">
              {this.props.loading &&
                <>
                  <Progress animated={true} value={100} />
                  <br />
                </>
              }

              <Button color="primary" size="lg" block disabled={this.props.loading} onClick={() => this.submit()}>Submit</Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}

export const SmartDataQuery = connect(mapStateToProps, actionBinder)(SmartDataQueryImpl);
