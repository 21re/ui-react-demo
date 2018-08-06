import * as React from "react";
import { returntypeof } from "../helper/returntypeof";
import { connect } from "react-redux";
import { Button, Col, Form, FormGroup, Label, Input, Row, Breadcrumb, BreadcrumbItem, Progress } from "reactstrap";
import { bind } from 'decko'
import { Address } from "../models/address"
import { State } from "../reducers/state";
import { actionBinder, BoundActions } from "../actions/bindable";
import { AxiosErrorAlert } from "./axios-error-alert";
import { NavigationPage } from "../actions/navigation";

const mapStateToProps = (state: State) => ({
  getReportError: state.demoState.getReportError,
  getReportInProgress: state.demoState.getReportInProgress,
  token: state.demoState.token
});

const stateProps = returntypeof(mapStateToProps);


export interface SmartDataQueryState {
  address: Partial<Address>
}

export interface SmartDataQueryProps {
  onSubmit: (address: Address) => void
}

type Props = typeof stateProps & BoundActions & SmartDataQueryProps;

class SmartDataResidentialReportImpl extends React.Component<Props, SmartDataQueryState> {
  constructor(props: Props) {
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
    this.isAddress(this.state.address) && this.props.onSubmit(this.state.address)
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
              <BreadcrumbItem active>Mikrolage Wohnen</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <h3>Get Residential Smartdata Report</h3>
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
              {this.props.getReportError &&
                <AxiosErrorAlert error={this.props.getReportError} />
              }

              {this.props.getReportInProgress &&
                <>
                  <Progress animated={true} value={100} />
                  <br />
                </>
              }

              <Button disabled={this.props.getReportInProgress} color="primary" size="lg" block onClick={() => this.submit()}>Submit</Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}

export const SmartDataResidentialReport = connect(mapStateToProps, actionBinder)(SmartDataResidentialReportImpl);
