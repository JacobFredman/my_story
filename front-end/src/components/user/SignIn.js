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
import LoadingPage from '../../components/LoadingPage';
import { message } from 'antd';





// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'




class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showUnAuthMsg: false,
      authMsg: '',
      loading: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }


  isEmailValid = () => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(this.state.email)) {
      message.warning('אימייל חייב להיות מהצורה a@b.c');
      return false;
    }
    return true;
  }

  isPasswordOk = () => {
    if (!this.state.password || this.state.password.length < 6) {
      message.warning('אורך הסיסמה חייב להיות לפחות 6 ספרות');
      return false;
    }
    return true;
  }

  isValid = () => {
    return this.isPasswordOk() && this.isEmailValid();
  }


  beforeHandleSubmit = () => {
    if (this.isValid())
      this.handleSubmit();
  }


  handleSubmit = event => {
    this.setState({ loading: true });
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(result => {
        this.genericSignIn(result);
        this.setState({ showUnAuthMsg: true, authMsg: 'זוהה בהצלחה' });
        // this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        console.log(error);
        this.setState({ showUnAuthMsg: true, authMsg: 'לא מזוהה', loading: false });
        message.error('שם משתמש או סיסמה שגויים');
        // this.setState({ error, showUnAuthMsg: true });
      });
    // this.sendData();
  }


  updateMyDb = async (tokenId) => {
    const response = await axios.post(
      baseUrl + 'sign_in',
      { "tokenId": tokenId },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    this.props.onGetAuth(response.data);

    console.log(response);
    return response;
  };

  googleSignIn = async () => {
    this.props.firebase.getSignInWithGoogle().then(result => {
      this.genericSignIn(result);
    })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
        message.error('אירעה תקלה בכניסה עם גוגל, נא נסה שנית');
        this.setState({ showUnAuthMsg: true });
      })
  }




  facebookSignIn = async () => {
    this.props.firebase.getSignInWithFacebook()
      .then(result => {
        this.genericSignIn(result);
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
        this.setState({ showUnAuthMsg: true });
      })
  }


  genericSignIn = result => {
    this.setState({ loading: true });
    console.log(result);

    document.cookie = 'refreshToken=' + result.user.refreshToken + '; expires=' + new Date(new Date().setFullYear(new Date().getFullYear() + 1)) + '; path=/';
    console.log(result);
    this.props.firebase.getTokenId().
      then(tokenId => {
        console.log(tokenId);
        document.cookie = 'tokenId=' + tokenId + '; expires=' + new Date(new Date().setHours(new Date().getHours() + 1)) + '; path=/';

        this.updateMyDb(tokenId)
          .then(resp => {
            this.props.history.push("/");
            this.setState({ loading: false });
          })
          .catch(error => {
            console.log(error);
            message.error('אירעה תקלה בכניסה, נא נסה שנית');
            this.setState({ loading: false });
          });
      }).catch(error => {
        console.log(error);
        message.error('אירעה תקלה, נא נסה שנית');
      });

  }


  sendPaawordReset = () => {
    this.props.firebase.doPasswordReset(this.state.email)
    const fStr = ': במידה ואתה רשום אימייל  עם איפוס הסיסמה נשלח לכתובת  ';
    this.setState({ authMsg: this.state.email + fStr, showUnAuthMsg: true });
  }


  render_component = () => {
    return (
      <React.Fragment>
        {/* {console.log(less)} */}
        {/* {this.state.loading ? <LoadingPage /> : ''} */}
        <Helmet bodyAttributes={{ style: 'background: transparent linear-gradient(45deg, #8BBF3F 0%, #43C2CF 100%) 0% 0% no-repeat padding-box' }} />

        <Row>
          <Col>
            {/* <WarnningWithOk
              show={this.state.showUnAuthMsg}
              onClickOk={() => this.setState({ showUnAuthMsg: false })}
              title=''
              bodyMsg={this.state.authMsg}
            >
            </WarnningWithOk> */}
          </Col>
        </Row>
        <Container className="d-flex align-items-center" style={{ textAlign: 'center', maxWidth: '380px', height: '100vh' }} >
          <Row style={{ margin: 'auto' }}>
            <Col>
              <Row>
                <Col>
                  <h2 style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Avigul', fontWeight: 'bold', fontSize: '43px' }}>התחברות</h2>
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
                        <Form.Control className="inputSignIn" style={{ textAlign: 'center' }} name='email' value={this.state.userName} type="email" placeholder="שם משתמש/מייל" onChange={this.handleChange} />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control className="inputSignIn" style={{ textAlign: 'center' }} name='password' value={this.state.password} type="password" placeholder="סיסמה" onChange={this.handleChange} />
                      </Form.Group>
                    </Form.Row>
                    <Row>
                      <Col>
                        <div className="goOnBtn" onClick={() => this.beforeHandleSubmit()}>כניסה</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="goToSignUpContainer">
                          <div className="downTextSignIn" style={{ color: '#FFFFFF', textAlign: 'left', flex: '0 0 70%', fontSize: '18px' }}>אין לך עדיין חשבון?</div>
                          <div onClick={() => this.props.history.push("/sign_up/")} style={{ color: '#61147B', flex: '2', textAlign: 'right', cursor: 'pointer', fontSize: '18px', color: '#F4CC6B' }}>הרשם </div>
                        </div>
                        <Row>
                          <Col>
                            <div className="goToSignUpContainer">
                              <div onClick={this.sendPaawordReset} style={{ color: '#61147B', flex: '2', textAlign: 'center', cursor: 'pointer', fontSize: '18px', color: '#F4CC6B' }}>שכחתי סיסמה</div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment >
    );
  }


  render() {
    let returnValue;
    if (this.state.loading)
      returnValue = <LoadingPage />;
    else
      returnValue = this.render_component();
    return returnValue;
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onGetAuth: val => dispatch({ type: 'AUTH', val }),
    // updateUserId: val => dispatch({ type: 'UPDATEUSERID', val }),
  };
};

// export default connect(null, mapDispatchToProps)(SignIn);
export default connect(null, mapDispatchToProps)(withFirebase(SignIn));