import * as React from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading, Button, Alert } from "reactstrap";
import { State } from "../reducers/state";
import { BoundActions, actionBinder } from "../actions/bindable";
import { connect } from "react-redux";
import { XLStoreApp } from "../models/xlstore";
import { bind } from "decko";


const mapStateToProps = (state: State) => ({
  token: state.demoState.token,
  apps: state.xlstoreState.apps,
});

type CalculateProps = ReturnType<typeof mapStateToProps> & BoundActions;

export class XLStoreAppListImpl extends React.Component<CalculateProps> {
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
      {this.props.apps.length > 0 ? this.props.apps.map(this.renderAppItem) : <Alert color="warning">There are currently no calculations available for your company.</Alert>}
    </ListGroup>);
  }

  @bind
  renderAppItem(app: XLStoreApp, index: number) {
    return <ListGroupItem key={index}>
      <ListGroupItemHeading>{app.name}</ListGroupItemHeading>
      {app.id}
      <div><Button onClick={() => this.props.openXLStoreApp(app.id)} >Details</Button></div>
    </ListGroupItem>
  }
}

export const XLStoreAppList = connect(mapStateToProps, actionBinder)(XLStoreAppListImpl)
