import { baseUrl } from '../../utils/StaticData';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { MessageWithOk } from '../../masseges/masseges';

class ConnectUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senderName: undefined,
            massage: undefined,
            emailtopic: undefined,
            showSeccessMsg: false,
        };
    };


    postMessage = async () => {
        await axios.post(
            baseUrl + 'about_us',
            // { "senderName": "יעקב", "massage": " הכל בסדר?", "emailtopic": "סתם נושא" },
            { "senderName": this.state.senderName, "massage": this.state.massage, "emailtopic": this.state.emailtopic },
            { headers: { 'Content-Type': 'application/json' } }
        );
        this.setState({ showSeccessMsg: true });
        // if(response.status == 200)   
    }

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };




    render() {
        return (
            <React.Fragment>
                <Row><Col>
                    <MessageWithOk
                        show={this.state.showSeccessMsg}
                        onClickOk={() => { this.setState({ showUnAuthMsg: false }); this.props.history.push('/'); }}
                        title='נשלח בהצלחה'
                        bodyMsg="נשלח בהצלחה, ניצור עמך קשר במידת הצורך"
                    >
                    </MessageWithOk>
                </Col>  </Row>
                <Container style={{ maxWidth: '400px' }}>
                    <Row>
                        {/* <Col></Col> */}
                        <Col>
                            <Form dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }} >
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridname">
                                        <Form.Label>שם:</Form.Label>
                                        <Form.Control required name='senderName' ref='name' type="text" onChange={this.handleChange} placeholder="ישראל ישראלי" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridAbout">
                                        <Form.Label>נושא:</Form.Label>
                                        <Form.Control required name='emailtopic' ref='about' type="text" onChange={this.handleChange} placeholder="רוצה לקחת אחריות" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridContent">
                                        <Form.Label>תוכן:</Form.Label>
                                        {/* <Form.Control required name='content' ref='content' type="text" placeholder="שאל חופשי.." /> */}
                                        <Form.Control required name='massage' ref='content' onChange={this.handleChange} placeholder='שאל חופשי...' as="textarea" rows="3" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Button variant="primary" onClick={this.postMessage} >שלח</Button>
                                </Form.Row>
                            </Form>
                        </Col>
                        {/* <Col></Col> */}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default ConnectUs;