import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { WarnningWithOk } from '../../masseges/Warnnings';
import { baseUrl } from '../../utils/StaticData';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Helmet from 'react-helmet';
import '../user/SignUp.css';
import ShowPrivatePolicy from './ShowPrivatePolicy';
import LoadingPage from '../LoadingPage';
import { message } from 'antd';





const INITIAL_STATE = {
    first_name: '',
    last_name: '',
    email_user_name: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    showUnAuthMsg: false,
    showPrivatePolicy: false,
    loading: false,
    private_policy_read: false
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        // this.sendData();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    beforeHandleSabmit = () => {
        if (this.isValid())
            this.handleSubmit();
        return;
    }

    handleSubmit = async () => {
        this.setState({ loading: true });
        const { first_name, last_name, email_user_name, passwordOne } = this.state;
        await axios.post(
            baseUrl + 'sign_up',
            {
                "email": email_user_name,
                "password": passwordOne,
                "user_first_name": first_name,
                "user_last_name": last_name
            },
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            this.setState({ loading: false });
            this.props.history.push("/sign_in");
        }
        )
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            })

    }

    isPasswordOneOk = () => {
        if (this.state.passwordOne.length < 6 || this.state.passwordOne === '') {
            // alert('אורך הסיסמה חייב להיות לפחות 6 ספרות')
            message.warning('אורך הסיסמה חייב להיות לפחות 6 ספרות');
            return false;
        }
        return true;
    }


    isTowPasswordIdentical = () => {
        if (this.state.passwordOne !== this.state.passwordTwo) {
            // alert('שתי הסיסמאות אינן זהות');
            message.warning('שתי הסיסמאות אינן זהות');
            return false;
        }
        return true;
    }

    isEmailValid = () => {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(this.state.email_user_name)) {

            // alert('אימייל חייב להיות מהצורה a@b.c');
            message.warning('אימייל חייב להיות מהצורה a@b.c');
            return false;
        }
        return true;
    }

    isNameOk = () => {
        if (!this.state.first_name || !this.state.last_name) {
            // alert('נא מלא שם פרטי ושם משפחה');
            message.warning('נא מלא שם פרטי ושם משפחה');
            return false;
        }
        return true;
    }

    isPrivecyPolicyRead = () => {
        if (!this.state.private_policy_read) {
            // alert(' לפני ההמשך עליך לקרוא את הסכם הפרטיות');
            message.warning(' לפני ההמשך עליך לקרוא את הסכם הפרטיות');
            return false;
        }
        return true;
    }






    isValid = () => {
        const { first_name, last_name, email_user_name, passwordOne, passwordTwo } = this.state;
        return this.isPasswordOneOk()
            && this.isTowPasswordIdentical()
            && this.isEmailValid()
            && this.isNameOk()
            && this.isPrivecyPolicyRead()
        // passwordOne !== passwordTwo ||
        //     passwordOne.length < 6 ||
        //     passwordOne === '' ||
        //     email === '' ||
        //     first_name === '' ||
        //     last_name === '';
    };

    render() {
        return (
            <React.Fragment>
                {this.state.loading ? <LoadingPage /> : ''}
                <Helmet bodyAttributes={{ style: 'background: transparent linear-gradient(45deg, #8BBF3F 0%, #43C2CF 100%) 0% 0% no-repeat padding-box' }} />
                <Container className="d-flex align-items-center" style={{ textAlign: 'center', maxWidth: '600px', height: '100vh' }} >
                    <Row style={{ margin: 'auto' }}>
                        <Col>

                            <Row >
                                <Col>
                                    <h2 style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Avigul' }}>הצטרפות</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form dir='rtl' onSubmit={this.handleSubmit} >
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridFirtsName">
                                                <Form.Control name='first_name' value={this.state.first_name} type="text" placeholder="שם פרטי" onChange={this.handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Control name='last_name' value={this.state.last_name} type="text" placeholder="שם משפחה" onChange={this.handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Control name='email_user_name' value={this.state.email_user_name} type="email" placeholder="מייל" onChange={this.handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Control name='passwordOne' value={this.state.password} type="password" placeholder="סיסמה" onChange={this.handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Control name='passwordTwo' value={this.state.password} type="password" placeholder="אימות סיסמה" onChange={this.handleChange} />
                                            </Form.Group>
                                            <Col></Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <span style={{ marginRight: '5px' }}>
                                                <input
                                                    style={{ marginRight: '20px' }}
                                                    style={{ marginLeft: '5px' }}
                                                    name="private_policy_read"
                                                    type="checkbox"
                                                    defaultChecked={false}
                                                    // checked={this.state.isGoing}
                                                    onChange={e => this.setState({ private_policy_read: e.target.checked })} />
                                                <p style={{ display: 'inline-block', marginLeft: '7px', color: 'white' }}>קראתי את</p>
                                                <span style={{ display: 'inline-block', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.setState({ showPrivatePolicy: true })}>הסכם הפרטיות</span>
                                            </span>
                                            <ShowPrivatePolicy open={this.state.showPrivatePolicy} onAceptPrivacyPolicy={() => this.setState({ showPrivatePolicy: false })} />
                                            {/* <Col>
                                                <p>קראתי את</p>
                                                <a>הסכם הפרטיות</a>
                                            </Col> */}
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridButton">
                                                <div className="goOnBtn" onClick={() => this.beforeHandleSabmit()}>המשך</div>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <div className="goToSignUpContainer">
                                        <div style={{ color: '#FFFFFF', textAlign: 'left', flex: '0 0 60%' }}>כבר יש לך חשבון?</div>
                                        <div onClick={() => this.props.history.push("/sign_in")} style={{ color: '#61147B', flex: '2', textAlign: 'right', cursor: 'pointer' }}>הכנס</div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment >
        );
    }
}

export default withFirebase(SignUp);