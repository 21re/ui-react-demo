import * as React from "react";
import { connect } from "react-redux";
import { State } from "../reducers/state";
import { Col, Row } from "reactstrap";
import { BoundActions, actionBinder } from "../actions/bindable";
import { NavigationPage } from "../actions/navigation";

const mapStateToProps = (state: State) => ({
  currentPage: state.navigation.currentPage,
});


type Props = ReturnType<typeof mapStateToProps> & BoundActions;

const DemoMenuImpl: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <>
      <Row>
        <Col xs="12" sm="6" md="4">
          <a href="#" onClick={(ev) => { ev.preventDefault(); props.navigateTo(NavigationPage.SmartDataQuery) }}>
            <div className="menuItem__item">
              <img src="/assets/smartdata.jpg" />
              <div className="menuItem__label">
                <span>Smart Data</span>
                <p>21st comprehensive data for the location and surroundings via data extraction</p>
              </div>
            </div>
          </a>
        </Col>
        <Col xs="12" sm="6" md="4">
          <a href="#" onClick={(ev) => { ev.preventDefault(); props.navigateCalculate() }}>
            <div className="menuItem__item">
              <img src="/assets/calculate.jpg" />
              <div className="menuItem__label">
                <span>Calculate</span>
                <p>Clear interface to choose and test evaluation models</p>
              </div>
            </div>
          </a>
        </Col>
        <Col xs="12" sm="6" md="4">
          <a href="#" onClick={(ev) => { ev.preventDefault(); props.navigateTo(NavigationPage.SmartDataResidentialReport) }}>
            <div className="menuItem__item">
              <img src="/assets/mlw.jpg" />
              <div className="menuItem__label">
                <span>Mikrolage Wohnen</span>
                <p>condition and potential of a location at a glance in a handy format</p>
              </div>
            </div>
          </a>
        </Col>
        <Col xs="12" sm="6" md="4">
          <a href="#" onClick={(ev) => { ev.preventDefault(); props.navigateTo(NavigationPage.Valuate) }}>
            <div className="menuItem__item">
              <img src="/assets/valuate.jpg" />
              <div className="menuItem__label">
                <span>Valuate</span>
                <p>based on the market data base of the 21st Real Estate GmbH</p>
              </div>
            </div>
          </a>
        </Col>
      </Row>
    </>
  );
}

export const DemoMenu = connect(mapStateToProps, actionBinder)(DemoMenuImpl);
export default DemoMenu;
