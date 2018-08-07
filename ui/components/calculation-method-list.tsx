import * as React from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading, Button } from "reactstrap";
import { returntypeof } from "../helper/returntypeof";
import { State } from "../reducers/state";
import { BoundActions, actionBinder } from "../actions/bindable";
import { connect } from "react-redux";
import { XLStoreApp } from "../models/calculation";
import { bind } from "decko";


const mapStateToProps = (state: State) => ({
  token: state.demoState.token,
  apps: state.xlstoreState.apps,
});

const stateProps = returntypeof(mapStateToProps);

type CalculateProps = typeof stateProps & BoundActions;

export class CalculationMethodListImpl extends React.Component<CalculateProps> {
  componentWillMount() {
    this.props.getXLStoreApps();
  }

  render() {
    return (
      <>
        <Row>
          <Col xs="12">
            <Breadcrumb>
              <BreadcrumbItem > <a href="#" onClick={(ev) => { ev.preventDefault(); this.props.navigateHome(this.props.token || "") }}>Home</a></BreadcrumbItem>
              <BreadcrumbItem active>Calculate</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        {this.renderInner()}
      </>)
  }

  renderInner() {
    return (<ListGroup>
      {this.props.apps.map(this.renderAppItem)}
    </ListGroup>);
  }

  @bind
  renderAppItem(app: XLStoreApp, index: number) {
    return <ListGroupItem key={index}>
      <ListGroupItemHeading>{app.name}</ListGroupItemHeading>
      {app.id}
      <div><Button onClick={() => this.props.openXLApp(app.id)} >Details</Button></div>
    </ListGroupItem>
  }
}

export const CalculationMethodList = connect(mapStateToProps, actionBinder)(CalculationMethodListImpl)
