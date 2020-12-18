import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { baseUrl } from '../../utils/StaticData';
import { connect } from 'react-redux';
import { WarnningWithOk } from '../../masseges/Warnnings';
import Row from 'react-bootstrap/Row';
import './singIn.css';
import axios from 'axios';
import { withFirebase } from '../Firebase';
import Container from 'react-bootstrap/Container';
import Helmet from 'react-helmet';
import '../user/SignUp.css';




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

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(result => {
        this.genericSignIn(result);
        this.setState({ showUnAuthMsg: true, authMsg: 'זוהה בהצלחה' });
        // this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ showUnAuthMsg: true, authMsg: 'לא מזוהה' });
        // this.setState({ error, showUnAuthMsg: true });
      });


    // this.sendData();
    // event.preventDefault();
  }


  updateMyDb = async (tokenId) => {
    const respone = await axios.post(
      baseUrl + 'sign_in',
      { "tokenId": tokenId },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    this.props.onGetAuth(respone.data);
    // a = { email: "jacov141@gmail.com", is_admin: 0 }
    return respone;
  };

  googleSignIn = async () => {
    this.props.firebase.getSignInWithGoogle().then(result => {
      this.genericSignIn(result);
    })
      .catch(error => {
        console.log(error);
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
    this.props.firebase.getTokenId()
      .then(tokenId => {
        // document.cookie = 'cookie2=' + tokenId + '; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/';
        // document.cookie = 'tokenId=' + tokenId + '; expires=' + new Date(new Date().setFullYear(new Date().getFullYear() + 1)) + '; path=/';
        document.cookie = 'tokenId=' + tokenId + '; expires=' + new Date(new Date().setHours(new Date().getHours() + 1)) + '; path=/';
        this.updateMyDb(tokenId)
          .then(resp => { this.props.history.push("/") })
          .catch(error => { console.log(error); alert('error'); })
      })
      .catch(error => {
        this.setState({ showUnAuthMsg: true });
      });


  }


  isInvalid = () => {
    const { email, password } = this.state;
    return (
      password.length < 6 ||
      password === '' ||
      email === '')
  }


  sendPaawordReset = () => {
    this.props.firebase.doPasswordReset(this.state.email)
    const fStr = ': במידה ואתה רשום אימייל  עם איפוס הסיסמה נשלח לכתובת  ';
    this.setState({ authMsg: this.state.email + fStr, showUnAuthMsg: true });
  }


  render() {
    return (
      <React.Fragment>
        <Helmet bodyAttributes={{ style: 'background: transparent linear-gradient(45deg, #8BBF3F 0%, #43C2CF 100%) 0% 0% no-repeat padding-box' }} />

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
        {/* <Row>
          <Col> */}
        {/* <Container style={{ maxWidth: '380px' }} fluid="sm" > */}
        <Container className="d-flex align-items-center" style={{ textAlign: 'center', maxWidth: '380px', height: '100vh' }} >
          {/* <h1>hhhhhh</h1> */}
          <Row style={{ margin: 'auto' }}>
            <Col>
              <Row>
                <Col>
                  <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>התחברות</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div onClick={this.facebookSignIn} className='btnSignIn facebookBtn'>התחבר באמצעות פייסבוק</div>
                </Col>
              </Row>
              <Row>
                <Col>

                  <div onClick={this.googleSignIn} className='btnSignIn googleBtn'> GOOGLE התחבר באמצעות</div>
                </Col>
              </Row>
              <Row>
                <Col>

                  <h4 className="midLine">או</h4>
                </Col>
              </Row>
              <Row>
                <Col>

                  <Form dir='rtl' style={{ textAlign: 'right', direction: 'rtl' }} onSubmit={this.handleSubmit} >
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Control style={{ textAlign: 'center' }} name='email' value={this.state.userName} type="email" placeholder="שם משתמש/מייל" onChange={this.handleChange} />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control style={{ textAlign: 'center' }} name='password' value={this.state.password} type="password" placeholder="סיסמה" onChange={this.handleChange} />
                      </Form.Group>
                    </Form.Row>
                    <Row>
                      <Col>
                        {/* <Button onClick={this.sendPaawordReset} size='sm' variant='outline-info'>שכחתי סיסמה</Button> */}
                        <div className="goOnBtn" onClick={() => this.handleSubmit()}>כניסה</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="goToSignUpContainer">
                          <div style={{ color: '#FFFFFF', textAlign: 'left', flex: '0 0 70%' }}>אין לך עדיין חשבון?</div>
                          <div onClick={() => this.props.history.push("/sign_up/")} style={{ color: '#61147B', flex: '2', textAlign: 'right', cursor: 'pointer' }}>הרשמ/י</div>
                        </div>
                        <Row>
                          <Col>
                            <div className="goToSignUpContainer">
                              <div onClick={this.sendPaawordReset} style={{ color: '#61147B', flex: '2', textAlign: 'center', cursor: 'pointer' }}>שכחתי סיסמה</div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {/* <Button variant="primary" onClick={this.googleSignIn} >בדיקה</Button> */}
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        {/* </Col>
        </Row > */}
      </React.Fragment >
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onGetAuth: val => dispatch({ type: 'AUTH', val }),
  };
};

// export default connect(null, mapDispatchToProps)(SignIn);
export default connect(null, mapDispatchToProps)(withFirebase(SignIn));