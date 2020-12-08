import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBarBootStrap from '././components/NavBarBootStrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import ShowProgress from './components/myProgress/showProgress';
import HomePage from './components/homePage/HomePage';
import ConnectUs from './components/connectUs/ConnectUs';
import UserStatistics from './components/myProgress/userStatistics';
import SignIn from './components/user/SignIn';
import Cups_and_points from './components/admin/CupsAndPoints';
import FeedbackText from './components/admin/FeedbackText';
import AdminReport from './components/admin/AdminReport';
import SignUp from './components/user/SignUp';
import UpdateReduxe from './utils/UpdateRedux';
import Part1 from './components/Progress2/Part1';
import Progress from './components/helpComponents/Progress';
import Example from './components/helpComponents/Example';

import ShowProgress from './components/myProgress/showProgress'
// import ShowProgress from './components/Progress2/ShowProgress';
import CupsAccumulation from './components/helpComponents/CupsAccumulation';
import AllRotatedPartsNames from './components/helpComponents/AllRotatedPartsNames';

// process.env.NODE_ENV = 'development';
// "start": "react-scripts start",



function App() {
  return (
    <React.Fragment>
      <UpdateReduxe></UpdateReduxe>
      <Router>
        <Container >
          {/* <Row>
            <Col><NavBarBootStrap ></NavBarBootStrap></Col>
          </Row> */}
          {/* <Route path="/show_progress" component={ShowProgress} /> */}
          <Row>
            <Col>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/user_statistics" component={UserStatistics} />
                <Route path="/admin/cups_and_points" component={Cups_and_points} />
                <Route path="/admin/feedback_text" component={FeedbackText} />
                <Route path="/admin/users_statistics" component={AdminReport} />
                <Route path="/sign_in" component={SignIn} />
                <Route path="/sign_up" component={SignUp} />
                <Route path="/connect_us" component={ConnectUs} />

                <Route path="/progress/part1" component={Part1} />
                <Route path="/progress1" component={Progress} />
                <Route path="/example" component={Example} />
                <Route path="/show_progress" component={ShowProgress} />
                <Route path="/Cups_accumulation" component={CupsAccumulation} />
                <Route path="/Rotated_part_names" component={AllRotatedPartsNames} />
              </Switch>
              {/* <Col>1 of 3</Col>
            <Col md="auto">Variable width content</Col>
            <Col >
              3 of 3
    </Col> */}
            </Col>
          </Row>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
