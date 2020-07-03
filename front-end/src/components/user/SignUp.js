import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { WarnningWithOk } from '../../masseges/Warnnings';
import { baseUrl } from '../../utils/StaticData';
import axios from 'axios';




const INITIAL_STATE = {
    user_first_name: '',
    user_last_name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    showUnAuthMsg: false
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

    handleSubmit = async () => {
        const { user_first_name, user_last_name, email, passwordOne } = this.state;
        await axios.post(
            baseUrl + 'sign_up',
            {
                "email": email,
                "password": passwordOne,
                "user_first_name": user_first_name,
                "user_last_name": user_last_name
            },
            { headers: { 'Content-Type': 'application/json' } }
        )

        this.props.history.push("/sign_in/")
    }


    isInvalid = () => {
        const { user_first_name, user_last_name, email, passwordOne, passwordTwo } = this.state;
        return passwordOne !== passwordTwo ||
            passwordOne.length < 6 ||
            passwordOne === '' ||
            email === '' ||
            user_first_name === '' ||
            user_last_name === '';
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <WarnningWithOk
                            show={this.state.showUnAuthMsg}
                            onClickOk={() => this.setState({ showUnAuthMsg: false })}
                            title='לא נרשם'
                            // bodyMsg='שם משתמש או סיסמה שגוי, נא נסה שנית'
                            bodyMsg={this.state.error}
                        >
                        </WarnningWithOk>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form dir='rtl' onSubmit={this.handleSubmit} >
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>שם פרטי</Form.Label>
                                    <Form.Control name='user_first_name' value={this.state.user_first_name} type="text" placeholder="שם פרטי" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>שם משפחה</Form.Label>
                                    <Form.Control name='user_last_name' value={this.state.user_last_name} type="text" placeholder="שם משפחה" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>קוד</Form.Label>
                                    <Form.Control name='passwordOne' value={this.state.password} type="password" placeholder="הקש סיסמה" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>אמת קוד</Form.Label>
                                    <Form.Control name='passwordTwo' value={this.state.password} type="password" placeholder="הקש סיסמה" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>אימייל</Form.Label>
                                    <Form.Control name='email' value={this.state.password} type="email" placeholder="הזן אימייל" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                {/* <Button onClick={e => this.handleSubmit(e)} disabled={this.isInvalid} variant="primary">הרשם</Button> */}
                                <Button disabled={this.isInvalid()} onClick={() => this.handleSubmit()} variant="primary">הרשם</Button>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default withFirebase(SignUp);