import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { baseUrl } from '../../utils/StaticData';
import { connect } from 'react-redux';
import { WarnningWithOk } from '../../masseges/Warnnings';
import GoogleLogin from 'react-google-login';
import Row from 'react-bootstrap/Row';
import FacebookLogin from 'react-facebook-login';
import './singIn.css';
import axios from 'axios';
import { withFirebase } from '../Firebase';


// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'




class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showUnAuthMsg: false,
      authMsg: '',
    };
    // this.sendData();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // handleSubmit = event => {
  //   this.sendData();
  //   event.preventDefault();
  // }

  handleSubmit = event => {
    const { email, password } = this.state;
    console.log(email);

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
        this.genericSignIn(result);
        this.setState({ showUnAuthMsg: true, authMsg: 'זוהה בהצלחה' });
        // this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        console.log(error);
        this.setState({ showUnAuthMsg: true, authMsg: 'לא מזוהה' });
        // this.setState({ error, showUnAuthMsg: true });
      });

    this.props.firebase.getTokenId()
      .then(tokenId => {
        document.cookie = 'tokenId=' + tokenId + '; expires=' + new Date(new Date().setFullYear(new Date().getFullYear() + 1)) + '; path=/; domain=kjl.lk.com;';
        document.cookie = 'somecookiename=' + 'tokenId' + '; expires=' + new Date(new Date().setFullYear(new Date().getFullYear() + 1)) + '; path=/; domain=kjl.lk.com;';
        console.log(tokenId);
      })
      .catch(error => {
        console.log(error);
      });


    // this.sendData();
    event.preventDefault();
  }


  sendData() {
    fetch(baseUrl + "sign_in", {
      method: "post",
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify({
        "userName": this.state.userName,
        "password": this.state.password
      })
    })
      .then((response) => {
        if (response.ok)
          window.UserUtils.updateTimeOut()
        if (response.status === 401)
          this.setState({ showUnAuthMsg: true });
        response.json()
          .then(data => {
            this.props.onGetAuth(data);
            this.props.history.push({ pathname: '/' });
          });
      });
  };


  // responseGoogle = (response) => {
  //   console.log(response);
  //   console.log(response.tokenObj);
  //   document.cookie = 'google_login_access_token=' + response.tokenObj.access_token + '; path=/'
  // }

  // responseFail = () => {
  //   this.setState({ showUnAuthMsg: true });
  // }

  // responseFacebook = (response) => {
  //   console.log(response);
  // }

  googleSignIn = async () => {
    this.props.firebase.getSignInWithGoogle().then(result => {
      this.genericSignIn(result);
    })
      .catch(error => {
        this.setState({ showUnAuthMsg: true });
      })
  }

  facebookSignIn = async () => {
    this.props.firebase.getSignInWithFacebook().then(result => {
      this.genericSignIn(result);
    })
      .catch(error => {
        console.log(error);
        this.setState({ showUnAuthMsg: true });
      })
  }

  genericSignIn = result => {
    console.log(result);
    this.props.firebase.getTokenId()
      .then(tokenId => {
        // document.cookie = 'cookie2=' + tokenId + '; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/';
        console.log(tokenId);
        document.cookie = 'tokenId=' + tokenId + '; expires=' + new Date(new Date().setFullYear(new Date().getFullYear() + 1)) + '; path=/';
      })
      .catch(error => {
        console.log(error);
        this.setState({ showUnAuthMsg: true });
      });

  }


  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <WarnningWithOk
              show={this.state.showUnAuthMsg}
              onClickOk={() => this.setState({ showUnAuthMsg: false })}
              title=''
              bodyMsg={this.state.authMsg}
            >
            </WarnningWithOk>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.googleSignIn} className='btnSignIn googleBtn'>הרשם עם גוגל</Button>
          </Col>
          <Col>
            <Button onClick={this.facebookSignIn} className='btnSignIn facebookBtn'>הרשם עם פייסבוק</Button>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <GoogleLogin
              clientId="453061761258-m3sij6fvt3jf3biao5dg7r6vqnrsq4n3.apps.googleusercontent.com"
              buttonText="הרשם עם גוגל"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="btnSignIn googleBtn"
            />
          </Col>
          <Col>
            <FacebookLogin
              cookie={false}
              appId="294738178333455"
              buttonText="הרשם עם פייסבוק"
              autoLoad={false}
              fields="name,email,picture"
              onClick={this.componentClicked}
              cssClass="btnSignIn facebookBtn"
              callback={this.responseFacebook} />
          </Col>
        </Row> */}
        <Row>
          <Col>
            <Form dir='rtl' onSubmit={this.handleSubmit} >

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>אימייל</Form.Label>
                  <Form.Control name='email' value={this.state.userName} type="text" placeholder="הקש אימייל" onChange={this.handleChange} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>סיסמה</Form.Label>
                  <Form.Control name='password' value={this.state.password} type="password" placeholder="הקש סיסמה" onChange={this.handleChange} />
                </Form.Group>
              </Form.Row>
              <Button onClick={this.handleSubmit} variant="primary" > כניסה למערכת</Button>
              <Button variant="primary" onClick={this.googleSignIn} >בדיקה</Button>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}


// const mapDispatchToProps = dispatch => {
//   return {
//     onGetAuth: val => dispatch({ type: 'AUTH', val }),
//   };
// };

// export default connect(null, mapDispatchToProps)(SignIn);
export default withFirebase(SignIn);