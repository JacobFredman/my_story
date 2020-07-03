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
    event.preventDefault();
  }


  updateMyDb = async (tokenId) => {
    const respone = await axios.post(
      baseUrl + 'sign_in',
      { "tokenId": tokenId },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    this.props.onGetAuth(respone.data);
    // a = { email: "jacov141@gmail.com", is_admin: 0 }
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
        this.props.history.push("/")
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
            <Container style={{ maxWidth: '400px' }} fluid="sm" >
              <Row>
                <Col>
                  <Button onClick={this.googleSignIn} className='btnSignIn googleBtn'>הרשם עם גוגל</Button>
                </Col>
                <Col>
                  <Button onClick={this.facebookSignIn} className='btnSignIn facebookBtn'>הרשם עם פייסבוק</Button>
                </Col>
              </Row>

              <Row>
                <Col>

                  <Form dir='rtl' style={{ textAlign: 'right', direction: 'rtl' }} onSubmit={this.handleSubmit} >
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>אימייל</Form.Label>
                        <Form.Control name='email' value={this.state.userName} type="email" placeholder="הקש אימייל" onChange={this.handleChange} />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>סיסמה</Form.Label>
                        <Form.Control name='password' value={this.state.password} type="password" placeholder="הקש סיסמה" onChange={this.handleChange} />
                      </Form.Group>
                    </Form.Row>
                    <Row>
                      <Col>
                        <Button disabled={this.isInvalid()} onClick={this.handleSubmit} variant="primary" > כניסה למערכת</Button>
                      </Col>
                      <Col>
                        <Button onClick={this.sendPaawordReset} size='sm' variant='outline-info'>שכחתי סיסמה</Button>
                      </Col>
                    </Row>
                    {/* <Button variant="primary" onClick={this.googleSignIn} >בדיקה</Button> */}
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row >
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