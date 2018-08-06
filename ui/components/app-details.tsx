import * as React from "react";
import { BoundActions, actionBinder } from "../actions/bindable";
import { returntypeof } from "../helper/returntypeof";
import { State } from "../reducers/state";
import { connect } from "react-redux";
import { Row, Col, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, Button, Input, FormGroup, Label } from "reactstrap";
import { NavigationPage } from "../actions/navigation";
import { XLStoreAppDetails, MetaField, OutputField, InputField } from "../models/calculation";

const mapStateToProps = (state: State) => ({
  token: state.demoState.token,
  loading: state.xlstoreState.loading,
  app: state.xlstoreState.activeApp,
  error: state.xlstoreState.error,
});

const stateProps = returntypeof(mapStateToProps);

type Props = typeof stateProps & BoundActions;

class AppDetailsImpl extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
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
              <div style={{ position: "sticky", bottom: "10px" }}>
                <FormGroup>
                  <Button block color="primary">Test calculation</Button>
                </FormGroup>
              </div>
            </CardBody>
          </Card>
          <br />
        </Col>
        <Col md="4">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>Output Fields</CardHeader>
                <CardBody>
                  {
                    app.outputFields.map(this.renderOutputField)
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
        </Col>
      </Row>
    )
  }

  renderInputField(field: InputField) {
    switch (field.fieldType) {
      case "boolean":
        return (<Row>
          <Col xs="12">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" value={field.default} />{' '}{field.name}
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
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label>{field.name}</Label>
                <Input value={field.default} />
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
    const { error, app } = this.props;

    if (!error && app) {
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
    } else {
      return JSON.stringify(error);
    }
  }
}

export const AppDetails = connect(mapStateToProps, actionBinder)(AppDetailsImpl)
