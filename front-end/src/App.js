import React, { useContext, useState } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBarBootStrap from '././components/NavBarBootStrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SignIn from './components/user/SignIn';
// import ShowProgress from './components/myProgress/showProgress';

import HomePage from './components/homePage/HomePage';
import ConnectUs from './components/connectUs/ConnectUs';
import UserStatistics from './components/myProgress/userStatistics';
import Cups_and_points from './components/admin/CupsAndPoints';
import FeedbackText from './components/admin/FeedbackText';
import AdminReport from './components/admin/AdminReport';
import "antd/dist/antd.css";
import SignUp from './components/user/SignUp';
import Part1 from './components/Progress2/Part1';
import Progress from './components/helpComponents/Progress';
import ProgressesBars from './components/helpComponents/ProgressesBars';


import UpdateReduxe from './utils/UpdateRedux';
import RefreshToken from './components/user/RefreshToken';
import NavBarAntd from './components/NavBarAntd';
import LoadingPage from '../src/components/LoadingPage';
import ShowProgress from './components/Progress2/ShowProgress';
import CupsAccumulation from './components/helpComponents/CupsAccumulation';
import AllRotatedPartsNames from './components/helpComponents/AllRotatedPartsNames';
import Example2 from './components/helpComponents/Example2';
import ShowProgress2 from './components/myProgress/ShowProgress2';
import PerekTetCupsCol from './components/myProgress/PerekTet/PerekTetCupsCol';
import { HashRouter } from 'react-router-dom';
import PrivatePolicy from '../src/components/user/PrivatePolicy';
import NavBarDesigned2 from './components/NavBarDesigned2';
import FirebaseContext from './components/Firebase/context';
import ProgressBarMobile from './components/mobile/ProgressBarMobile';
import Credit from '../src/components/someBtns/Credit';


// process.env.NODE_ENV = 'development';
// "start": "react-scripts start",


{/* <Row>
  <Col><NavBarBootStrap ></NavBarBootStrap></Col>
</Row> */}



function App(props) {
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);


  const appComponents = (
    <React.Fragment>
      <UpdateReduxe ></UpdateReduxe>
      <Router >
        <Container >
          <Row>
            <Col>
              <Switch>
                <Route path="/sign_in" component={SignIn} />
                <Route path="/user_statistics" component={UserStatistics} />
                <Route path="/admin/cups_and_points" component={Cups_and_points} />
                <Route path="/admin/feedback_text" component={FeedbackText} />
                <Route path="/admin/users_statistics" component={AdminReport} />
                <Route path="/client/sign_in" component={SignIn} />
                <Route path="/sign_up" component={SignUp} />
                <Route path="/client/sign_up" component={SignUp} />
                <Route path="/show_progress" component={ShowProgress} />
                <Route path="/quick_fill_cups" component={ShowProgress2} />
                <Route path="/client/quick_fill_cups" component={ShowProgress2} />
                <Route path="/loading_page" component={LoadingPage} />
                <Route path="/navBar_example" component={NavBarDesigned2} />
                <Route path="/navBar_antd" component={NavBarAntd} />
                <Route path="/mobile_progress" component={ProgressBarMobile} />
                <Route path="/credit" component={Credit} />
                <Route path="/" component={ShowProgress} />
                {/* <Route path="/exapmle_modal" component={Example2} />
                <Route path="/private_policy" component={PrivatePolicy} /> */}
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </React.Fragment>
  );

  return isTokenRefreshed
    ?
    appComponents
    :
    <>
      <RefreshToken setIsTokenRefreshed={setIsTokenRefreshed} /> <LoadingPage />
    </>
}

export default App;
