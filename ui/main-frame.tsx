import * as React from "react";
import { connect } from "react-redux";
import { Component } from "react";

import { State } from "./reducers/state";
import { NavigationPage } from "./actions/navigation";
import { BoundActions, actionBinder } from './actions/bindable'
import {
  Alert,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
} from 'reactstrap';
import DemoMenu from "./components/demo-menu";
import { SmartDataQuery } from "./components/smartdata-query";
import * as cookie from "cookie";
import { SmartDataResidentialReport } from "./components/smartdata-residential-report";
import { XLStoreAppList } from "./components/xlstore-app-list";
import { XLStoreAppDetailsView } from "./components/xlstore-app-details-view";
import * as numeral from "numeral";
import { Valuate } from "./components/valuate";

const mapStateToProps = (state: State) => ({
  currentPage: state.navigation.currentPage,
  token: state.demoState.token,
  smartdata: state.demoState.smartdata,
  loading: state.demoState.smartdataLoading,
});

type Props = ReturnType<typeof mapStateToProps> & BoundActions;

class MainFrameImpl extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
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

    const cookies = cookie.parse(document.cookie);
    if (cookies['TOKEN']) {
      this.props.registerToken(cookies['TOKEN'])
    }
  }

  renderInner() {
    switch (this.props.currentPage) {
      case NavigationPage.DemoIndex:
        return <DemoMenu />;
      case NavigationPage.SmartDataQuery:
        return <SmartDataQuery />
      case NavigationPage.Valuate:
        return <Valuate />
      case NavigationPage.SmartDataResidentialReport:
        return <SmartDataResidentialReport onSubmit={(address) => this.props.getSmartDataResidentialReport(address)} />
      case NavigationPage.Calculate:
        return <XLStoreAppList />
      case NavigationPage.AppDetails:
        return <XLStoreAppDetailsView />
      default:
        return "not routed";
    }
  }

  render() {
    return (
      <div>
        <div className="top-navigation">
          <Navbar color="tertiary" dark expand="md">
            <NavbarBrand href="/" className="mr-auto">
              <div className="top-navigation__logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 565.5 331.5"><path fill="#767576" d="M203 217h-72l30-21 4.6-3.4c23-17 35.7-31.5 35.7-57.7v-1c0-33-26.3-56-64.3-56-34 0-53 13-71.8 37l33 27.3c13.6-15.8 23-22.6 34.6-22.6 11.5 0 19.3 6.7 19.3 17.7 0 10.6-6 18.8-22 31.6l-65 50v37h138v-39zm166 17.3c-10.6 0-23.5-4-35.3-11.8l-13.5 21.8c14.2 10.3 31.3 15.2 48.6 15.2 25 0 42-11.8 42-34.4 0-20-16-27-36.5-32-10.8-3-16.7-5-16.7-9v-.4c0-3 2.8-5 8.4-5 8.2 0 19.8 3.7 30.4 9.6l12.3-22.7c-5.2-3.3-11-6-17.4-8-8-2.5-16.6-4-25-4-18.8 0-33.7 7.7-39 21.8-1.4 4-2.2 8-2.2 12.5v.4c0 20.7 17 27.5 37 33 11 3 17 4.6 17 8.6v.5c0 3.8-3 5.7-9 5.7z"></path><path fill="#767576" d="M490 189.2V165h-24v-36.3h-36V165h-14.6l-13 24H430v36c0 24.7 12.8 34 34.5 34 10 0 18.6-2 25-5.7V225c-4.3 2.2-8.8 3.5-13.6 3.5-7 0-10-3-10-10.3v-29h24zM300.7 81l-24-12.3-74.2 38 9.2 37.6 41-18.5v130.7h48V125.7"></path><path fill="#E72264" d="M306.6 84v44.5l35 15.8 9.3-37.5"></path></svg>
              </div>
            </NavbarBrand>
            <Nav>
              <NavItem>
                {
                  this.props.token === null ?
                    <div className="tokenIndicator tokenIndicator--invalid" /> :
                    <div className="tokenIndicator tokenIndicator--valid" />
                }
              </NavItem>
            </Nav>
          </Navbar>
        </div>
        <Container>
          {
            this.props.token === null && <Alert color="warning">Please use a valid Token to use this App.</Alert>
          }
          {this.renderInner()}
        </Container>
      </div>
    )
  }

}

export const MainFrame = connect(mapStateToProps, actionBinder)(MainFrameImpl);
