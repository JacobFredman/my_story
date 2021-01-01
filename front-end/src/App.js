import React, { useContext, useState } from 'react';
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
import ProgressesBars from './components/helpComponents/ProgressesBars';

// import ShowProgress from './components/myProgress/showProgress'
import ShowProgress from './components/Progress2/ShowProgress';
import CupsAccumulation from './components/helpComponents/CupsAccumulation';
import AllRotatedPartsNames from './components/helpComponents/AllRotatedPartsNames';
import Example2 from './components/helpComponents/Example2';
import ShowProgress2 from './components/myProgress/ShowProgress2';
import PerekTetCupsCol from './components/myProgress/PerekTet/PerekTetCupsCol';
import { HashRouter } from 'react-router-dom';
import PrivatePolicy from '../src/components/user/PrivatePolicy';
import LoadingPage from '../src/components/LoadingPage';
import NavBarDesigned2 from './components/NavBarDesigned2';
import FirebaseContext from './components/Firebase/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarAntd from './components/NavBarAntd';


// process.env.NODE_ENV = 'development';
// "start": "react-scripts start",


{/* <Row>
  <Col><NavBarBootStrap ></NavBarBootStrap></Col>
</Row> */}

function App(props) {
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);
  const firebase = useContext(FirebaseContext);

  firebase.auth.onAuthStateChanged(
    (user) => {
      // if (firebase.auth.currentUser) {
      if (user) {
        // console.log(firebase.auth.currentUser);
        firebase.getTokenId()
          .then(tokenId => {
            document.cookie = 'tokenId=' + tokenId + '; expires=' + new Date(new Date().setHours(new Date().getHours() + 1)) + '; path=/';
            setIsTokenRefreshed(true);
          }
          )
          .catch(() => { setIsTokenRefreshed(true); alert('tokenid problem') })
      }
      else
        setIsTokenRefreshed(true);
      // console.log("onAuthStateChanged: " + !!user);
    }
  );


  const appComponents = (
    <React.Fragment>
      <UpdateReduxe></UpdateReduxe>
      <Router >
        <Container >
          <Row>
            <Col>
              <Switch>
                <Route path="/user_statistics" component={UserStatistics} />
                <Route path="/admin/cups_and_points" component={Cups_and_points} />
                <Route path="/admin/feedback_text" component={FeedbackText} />
                <Route path="/admin/users_statistics" component={AdminReport} />
                <Route path="/sign_in" component={SignIn} />
                <Route path="/client/sign_in" component={SignIn} />
                <Route path="/sign_up" component={SignUp} />
                <Route path="/client/sign_up" component={SignUp} />
                <Route path="/show_progress" component={ShowProgress} />
                <Route path="/quick_fill_cups" component={ShowProgress2} />
                <Route path="/client/quick_fill_cups" component={ShowProgress2} />
                <Route path="/loading_page" component={LoadingPage} />
                <Route path="/navBar_example" component={NavBarDesigned2} />
                <Route path="/navBar_antd" component={NavBarAntd} />
                <Route path="/" component={ShowProgress} />
                <Route path="/exapmle_modal" component={Example2} />
                <Route path="/private_policy" component={PrivatePolicy} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </React.Fragment>
  );

  return isTokenRefreshed ? appComponents : <LoadingPage />
}

export default App;
