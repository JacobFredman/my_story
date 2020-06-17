import { baseUrl } from '../../utils/StaticData';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class ConnectUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senderName: undefined,
            massage: undefined,
            emailtopic: undefined
        };
    };


    postMessage = async () => {
        const response = await axios.post(
            baseUrl + 'about_us',
            // { "senderName": "יעקב", "massage": " הכל בסדר?", "emailtopic": "סתם נושא" },
            { "senderName": this.state.senderName, "massage": this.state.massage, "emailtopic": this.state.emailtopic },
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(response)
        // if(response.status == 200)   
    }

    handleChange = (e) => {
        console.log({ ...this.state, [e.target.name]: e.target.value });
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };




    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

export default ConnectUs;