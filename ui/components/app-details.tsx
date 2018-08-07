import * as React from "react";
import { BoundActions, actionBinder } from "../actions/bindable";
import { State } from "../reducers/state";
import { connect } from "react-redux";
import { Row, Col, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, Button, Input, FormGroup, Label, Alert } from "reactstrap";
import { NavigationPage } from "../actions/navigation";
import { XLStoreAppDetails, MetaField, OutputField, InputField, CalculationResult } from "../models/calculation";
import { bind } from "decko";

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
}

class AppDetailsImpl extends React.Component<Props, AppDetailsState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputField: {},
    }
  }

  renderAppDetails(app: XLStoreAppDetails) {
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
                    onClick={() => { (document.getElementById("just-a-jump-beacon") as any).scrollIntoView(); this.props.calculate(app.id, this.state.inputField) }}
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

  renderCalculationResult(result: CalculationResult) {
    return Object.keys(result)
      .map((title, i) => {
        const value = result[title];
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

  renderError(error: string) {
    return (
      <Alert color="danger">Error: {error}</Alert>
    );
  }

  updateInputFieldState(key: string, value: string) {
    this.setState({
      inputField: {
        ...this.state.inputField,
        ...{ [key]: value },
      },
    })
  }

  @bind
  renderInputField(field: InputField, idx: number) {
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
                    <Input type="checkbox" {...(fieldValue === "TRUE" ? { checked: true } : { checked: false })} onChange={ev => this.updateInputFieldState(field.name, ev.target.checked ? "TRUE" : "FALSE")} />
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

  renderMetaField(field: MetaField, index: number) {
    return (
      <Row key={index}>
        <Col>
          <strong>{field.name}</strong><br />
          <p>{field.value}</p>
        </Col>
      </Row>
    );
  }

  renderOutputField(field: OutputField, index: number) {
    return (
      <Row key={index}>
        <Col>
          <strong>{field.name}</strong><br />
        </Col>
      </Row>
    );
  }

  render() {
    const { error, app, loading } = this.props;

    if (!error && !loading && app) {
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
          {this.renderAppDetails(app)}
        </>)
    } else if (loading) {
      return <h1>Loading...</h1>
    } else {
      return <Alert color="danger">{error}</Alert>
    }
  }
}

export const AppDetails = connect(mapStateToProps, actionBinder)(AppDetailsImpl)
