import * as React from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Alert,
  Card,
  CardBody,
  Container
} from "reactstrap";
import { bind } from 'decko'
import { Address } from "../models/address"
import { Level0Data, CellData } from "../models/smartdata";
import { State } from "../reducers/state";
import { BoundActions, actionBinder } from "../actions/bindable";
import { connect } from "react-redux";
import { NavigationPage } from "../actions/navigation";
import * as numeral from "numeral";
import { UserInput, ValuationResult } from "../models/valuate";

export interface ValuateState {
  address: Partial<Address>
  userInput: UserInput
}

export type Level0DataKeys = keyof Level0Data;
export type CellDataKeys = keyof CellData;

interface BooleanUserInputs {
  name: keyof UserInput
  description: string
  value: boolean
}

const mapStateToProps = (state: State) => ({
  token: state.demoState.token,
  valuation: state.demoState.valuationResult,
  loading: state.demoState.valuationInProgress,
  error: state.demoState.error,
});

type ValuateProps = ReturnType<typeof mapStateToProps> & BoundActions;

export class ValuateImpl extends React.Component<ValuateProps, ValuateState> {
  constructor(props: ValuateProps) {
    super(props);


    numeral.locale("de")

    this.state = {
      address: {
        route: "Hausvogteiplatz",
        streetNumber: "11",
        postalCode: "10117",
        locality: "Berlin",
        country: "DE",
      },
      "userInput": {
        refurbished: true,
        premium: true,
        first_occupancy: true,
        balcony: true,
        built_in_kitchen: true,
        garden: true,
        basement: true,
        elevator: true,
        heating_in_floor: true,
        parquet_floor: true,
        year_of_construction: 1990,
        area: 50,
        floor_attic: true,
        floor_ground: true,
        plot_area: 1000.1,
        object_is_house: true,
        in_need_of_renovation: true,
      },
    }
  }

  isAddress(value: Partial<Address>): value is Address {
    return value.country !== undefined && value.locality !== undefined
      && value.postalCode !== undefined && value.route !== undefined
      && value.streetNumber !== undefined;
  }

  submit() {
    this.isAddress(this.state.address) && this.props.valuate({ userInput: this.state.userInput, address: this.state.address })
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

  @bind
  updateUserInputNumber(field: keyof UserInput): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        userInput: {
          ...this.state.userInput,
          [field]: parseFloat(event.target.value),
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
              <BreadcrumbItem active>Valuate</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        {
          this.props.valuation
            ? this.renderValuateResult(this.props.valuation)
            : this.renderQueryForm()
        }
      </>
    )
  }

  renderValuateResult(result: ValuationResult) {
    return (
      <>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <strong>{this.state.address.route} {this.state.address.streetNumber}</strong><br />
                <em>{this.state.address.postalCode} {this.state.address.locality}, {this.state.address.country}</em>
              </Col>
              <Col>
                <Button onClick={() => this.props.resetValuate()}>Query new Address</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <br />
        <h3>Results</h3>
        <table className="table">
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>sales price per m²</td>
              <td>{result.sale_sqm.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>
        <Container>
        </Container>
      </>
    )
  }

  renderQueryForm() {
    const checkboxes: BooleanUserInputs[] = [
      { description: "This object is refurbished", name: "refurbished", value: this.state.userInput.refurbished },
      { description: "The interior of the object is of premium quality", name: "premium", value: this.state.userInput.premium },
      { description: "The object will be occupied for the first time", name: "first_occupancy", value: this.state.userInput.first_occupancy },
      { description: "The object has a balcony", name: "balcony", value: this.state.userInput.balcony },
      { description: "The object is with a build in kitchen", name: "built_in_kitchen", value: this.state.userInput.built_in_kitchen },
      { description: "The object has a garden", name: "garden", value: this.state.userInput.garden },
      { description: "The object has a basement", name: "basement", value: this.state.userInput.basement },
      { description: "The object has an elevator", name: "elevator", value: this.state.userInput.elevator },
      { description: "The object has underfloor heating", name: "heating_in_floor", value: this.state.userInput.heating_in_floor },
      { description: "The object has parquet floor", name: "parquet_floor", value: this.state.userInput.parquet_floor },
      { description: "The object is located in the top floor", name: "floor_attic", value: this.state.userInput.floor_attic },
      { description: "The object is located in the ground floor", name: "floor_ground", value: this.state.userInput.floor_ground },
      { description: "The object is a house", name: "object_is_house", value: this.state.userInput.object_is_house },
      { description: "The object is in need of renovation", name: "in_need_of_renovation", value: this.state.userInput.in_need_of_renovation },
    ];

    return (
      <>
        <Form>
          <h3>Address</h3>
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
          </Row>
          <h3>Input</h3>
          <Row>
            {checkboxes.map(e =>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label className="form-check-inline no_indent">
                    <Input type="checkbox" name="premium" checked={e.value} id="premium" onChange={() => this.setState({ userInput: { ...this.state.userInput, [e.name]: !this.state.userInput[e.name] } })} />
                    {e.description}
                  </Label>
                </FormGroup>
              </Col>
            )}
          </Row>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label for="year_of_construction">Construction year of the object</Label>
                <Input type="number" name="year_of_construction" value={this.state.userInput.year_of_construction} id="year_of_construction" onChange={this.updateUserInputNumber("year_of_construction")} />
              </FormGroup>
            </Col>
            <Col xs="12">
              <FormGroup>
                <Label for="area">Living area of the object</Label>
                <Input type="number" name="area" value={this.state.userInput.area} id="area" onChange={this.updateUserInputNumber("area")} />
              </FormGroup>
            </Col>
            <Col xs="12">
              <FormGroup>
                <Label for="plot_area">The plot area of the object (0 for apartment)</Label>
                <Input type="number" name="plot_area" value={this.state.userInput.plot_area} id="plot_area" onChange={this.updateUserInputNumber("plot_area")} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
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
        {this.props.error && <Alert color="danger">Error: {this.props.error.response && this.props.error.response.data ? JSON.stringify(this.props.error.response.data) : this.props.error.message}</Alert>}
      </>
    )
  }
}

export const Valuate = connect(mapStateToProps, actionBinder)(ValuateImpl);
