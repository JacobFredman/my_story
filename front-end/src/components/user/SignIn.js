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

// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'




class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      showUnAuthMsg: false,
    };
    // this.sendData();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    this.sendData();
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


  responseGoogle = (response) => {
    console.log(response);
    console.log(response.tokenObj);
    document.cookie = 'google_login_access_token=' + response.tokenObj.access_token + '; path=/'
  }

  responseFail = () => {
    this.setState({ showUnAuthMsg: true });
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  check = async () => {
    // document.cookie = "username=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    document.cookie = await 'cookie2=test; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=http://localhost:3000/';
    const response = await axios.post(
      baseUrl + 'abcde',
      { "a": "a" },
      { headers: { 'Content-Type': 'application/json' } }
    );
    // this.setState({ chaptersAndCups: response.data.rows });
    console.log(response);


  }


  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <WarnningWithOk
              show={this.state.showUnAuthMsg}
              onClickOk={() => this.setState({ showUnAuthMsg: false })}
              title='לא מזוהה'
              bodyMsg='שם משתמש או סיסמה שגוי, נא נסה שנית'
            >
            </WarnningWithOk>
          </Col>
        </Row>
        <Row>
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
        </Row>
        <Row>
          <Col>
            <Form dir='rtl' onSubmit={this.handleSubmit} >

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>שם משתמש</Form.Label>
                  <Form.Control name='userName' value={this.state.userName} type="text" placeholder="שם משתמש" onChange={this.handleChange} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>קוד</Form.Label>
                  <Form.Control name='password' value={this.state.password} type="password" placeholder="קוד" onChange={this.handleChange} />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit"> כניסה למערכת</Button>
              <Button variant="primary" onClick={this.check} type="submit">בדיקה</Button>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onGetAuth: val => dispatch({ type: 'AUTH', val }),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);