import * as React from "react";
import { BoundActions, actionBinder } from "../actions/bindable";
import { State } from "../reducers/state";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  FormGroup,
  Label,
  Alert
} from "reactstrap";
import { NavigationPage } from "../actions/navigation";
import { XLStoreAppDetails, MetaField, OutputField, InputField, XLCalculationResult } from "../models/xlstore";
import { bind } from "decko";
import { Address } from "../models/address";

const mapStateToProps = (state: State) => ({
  token: state.demoState.token,
  loading: state.xlstoreState.loading,
  app: state.xlstoreState.activeApp,
  error: state.xlstoreState.error,
  calculation: state.xlstoreState.calculation,
});

type Props = ReturnType<typeof mapStateToProps> & BoundActions;

export interface AppDetailsState {
  inputField: { [P: string]: string }
  address: Address
}

class XLStoreAppDetailsViewImpl extends React.Component<Props, AppDetailsState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputField: {},
      address: {
        route: "Hausvogteiplatz",
        streetNumber: "11",
        postalCode: "10117",
        locality: "Berlin",
        country: "DE",
      },
    }
  }

  render() {
    const { error, app, loading } = this.props;

    if (!error && !loading && app) {
      const requireAddress = (app.requirements.indexOf("smartdata") >= 0);

      return (
        <>
          <Row>
            <Col xs="12">
              <Breadcrumb>
                <BreadcrumbItem > <a href="#" onClick={(ev) => { ev.preventDefault(); this.props.navigateTo(NavigationPage.DemoIndex, { token: this.props.token || "" }) }}>Home</a></BreadcrumbItem>
                <BreadcrumbItem >Calculate</BreadcrumbItem>
                <BreadcrumbItem active>{app.name}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          {requireAddress && this.renderAddress()}
          {this.renderAppDetails(app)}
        </>)
    } else if (loading) {
      return <h1>Loading...</h1>
    } else {
      return <Alert color="danger">{error}</Alert>
    }
  }

  private renderAppDetails(app: XLStoreAppDetails) {
    return (
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>Input Fields</CardHeader>
            <CardBody>
              {
                app.inputFields.map(this.renderInputField)
              }

              <div style={{ position: "sticky", bottom: "10px", marginTop: "10px" }}>
                <FormGroup>
                  <Button block
                    color="primary" {...(this.props.calculation.loading ? { disabled: true } : {})}
                    onClick={this.onCalculate}
                  >{this.props.loading ? "Loading..." : "Calculate"}</Button>
                </FormGroup>
              </div>
            </CardBody>
          </Card>
          <br />
        </Col>
        <Col md="4">
          <div className="calculationResult--floating">
            <Row>
              <Col xs="12">
                <Card>
                  <CardHeader>Output Fields</CardHeader>
                  <a id="just-a-jump-beacon" />
                  <CardBody>
                    {
                      this.props.calculation.result
                        ? this.renderCalculationResult(this.props.calculation.result)
                        : app.outputFields.map(this.renderOutputField)
                    }
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs="12">
                <Card>
                  <CardHeader>Meta Fields</CardHeader>
                  <CardBody>
                    {
                      app.metaFields.map(this.renderMetaField)
                    }
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    )
  }

  private renderAddress() {
    return (
      <Row>
        <Col md="8">
          <h3>Address</h3>
          <Card>
            <CardHeader>Address</CardHeader>
            <CardBody>

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
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }

  private renderError(error: string) {
    return (
      <Alert color="danger">Error: {error}</Alert>
    );
  }

  private renderMetaField(field: MetaField, index: number) {
    return (
      <Row key={index}>
        <Col>
          <strong>{field.name}</strong><br />
          <p>{field.value}</p>
        </Col>
      </Row>
    );
  }

  private renderOutputField(field: OutputField, index: number) {
    return (
      <Row key={index}>
        <Col>
          <strong>{field.name}</strong><br />
        </Col>
      </Row>
    );
  }

  private renderCalculationResult(calculationResult: XLCalculationResult) {
    return Object.keys(calculationResult.result)
      .map((title, i) => {
        const value = calculationResult.result[title];
        return (
          <Row key={i}>
            <Col>
              <strong>{title}</strong>
            </Col>
            <Col>
              {value !== null && typeof value === "object" ? this.renderError(value.errorCode) : <span>{value === null ? "-" : value}</span>}
            </Col>
          </Row>
        )
      })
  }

  @bind
  private renderInputField(field: InputField, idx: number) {
    const fieldValue = this.state.inputField[field.name] === undefined ? field.default : this.state.inputField[field.name];
    switch (field.fieldType) {
      case "boolean":
        return (
          <Row key={idx}>
            <Col xs="12">
              <Label> {field.name} | {field.fieldType}</Label>
              <FormGroup check>
                <Label check>
                  <div style={{ marginTop: "-1.3rem" }}>
                    <Input type="checkbox" checked={fieldValue === "TRUE"} onChange={ev => this.updateInputFieldState(field.name, ev.target.checked ? "TRUE" : "FALSE")} />
                  </div>
                </Label>
              </FormGroup>
            </Col>
          </Row>);
      case "text":
      case "date":
      case "float":
      case "integer":
      case "money":
      case "multiline":
      case "percent":
      default:
        return (
          <Row key={idx}>
            <Col xs="12">
              <FormGroup>
                <Label>{field.name} | {field.fieldType}</Label>
                <Input onChange={ev => this.updateInputFieldState(field.name, ev.target.value)} value={fieldValue} />
              </FormGroup>
            </Col>
          </Row>
        )
    }
  }

  @bind
  private updateAddress(field: keyof Address): (event: React.ChangeEvent<HTMLInputElement>) => void {
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
  private updateInputFieldState(key: string, value: string) {
    this.setState({
      inputField: {
        ...this.state.inputField,
        ...{ [key]: value },
      },
    })
  }

  @bind
  private onCalculate() {
    const { app } = this.props;

    if (!app) return;

    const requireAddress = (app.requirements.indexOf("smartdata") >= 0);

    (document.getElementById("just-a-jump-beacon") as any).scrollIntoView();
    if (requireAddress)
      this.props.calculateXLStoreApp(app.id, { user: this.state.inputField, address: this.state.address });
    else
      this.props.calculateXLStoreApp(app.id, { user: this.state.inputField });
  }
}

export const XLStoreAppDetailsView = connect(mapStateToProps, actionBinder)(XLStoreAppDetailsViewImpl);
