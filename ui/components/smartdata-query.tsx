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
  Progress,
  Alert
} from "reactstrap";
import { bind } from 'decko'
import { Address } from "../models/address"
import { SmartdataResult, Level0Data, CellData } from "../models/smartdata";
import { State } from "../reducers/state";
import { BoundActions, actionBinder } from "../actions/bindable";
import { connect } from "react-redux";
import { NavigationPage } from "../actions/navigation";
import * as numeral from "numeral";

export interface SmartDataQueryState {
  address: Partial<Address>
}

export type Level0DataKeys = keyof Level0Data;
export type CellDataKeys = keyof CellData;

const mapStateToProps = (state: State) => ({
  token: state.demoState.token,
  smartdata: state.demoState.smartdata,
  loading: state.demoState.smartdataLoading,
  error: state.demoState.error,
});

type SmartDataQueryProps = ReturnType<typeof mapStateToProps> & BoundActions;

export class SmartDataQueryImpl extends React.Component<SmartDataQueryProps, SmartDataQueryState> {
  constructor(props: SmartDataQueryProps) {
    super(props);

    numeral.register('locale', 'de', {
      delimiters: {
        thousands: ' ',
        decimal: ',',
      },
      abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't',
      },
      ordinal: function(number) {
        return '.';
      },
      currency: {
        symbol: '€',
      },
    })

    numeral.locale("de")

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
    const translation: { [P in Level0DataKeys]: [string, (value: number) => string] } = {
      cellId: ["", value => ""],
      cellSaleML: ["Buying price (Machine Learning)", value => numeral(value).format("0,0.00 $")],
      cellSaleCP: ["Buying price (Comparables)", value => numeral(value).format("0,0.00 $")],
      cellRentML: ["Rent (Machine Learning)", value => numeral(value).format("0,0.00 $")],
      cellRentCP: ["Rent (Comparables)", value => numeral(value).format("0,0.00 $")],
      cellMultiplierML: ["Multiplier (Machine Learning)", value => numeral(value).format("0.00")],
      cellMultiplierCP: ["Multiplier (Comparables)", value => numeral(value).format("0.00")],
      cellGrossInitialYieldML: ["Gross Initial Yield (Machine Learning)", value => numeral(value).format("0.00 %")],
      cellGrossInitialYieldCP: ["Gross Initial Yield (Comparables)", value => numeral(value).format("0.00 %")],
    };

    return (
      <>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <i>#{level0.cellId}</i><br />
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
            Object.keys(level0).map((key: Level0DataKeys) => {
              if (key === "cellId") return null;

              const text = translation[key][0]

              return (
                <>
                  <strong>{text}</strong>
                  <Table>
                    {Object.keys(level0[key]).map((level0key: CellDataKeys) => {
                      const format = translation[key][1](level0[key][level0key])

                      return (
                        <tr><td>{level0key}</td><td>{format}</td></tr>
                      )
                    })}
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
        <br />
        {this.props.error && <Alert color="danger">Error: {this.props.error.response && this.props.error.response.data ? this.props.error.response.data : this.props.error.message}</Alert>}
      </>
    )
  }
}

export const SmartDataQuery = connect(mapStateToProps, actionBinder)(SmartDataQueryImpl);
