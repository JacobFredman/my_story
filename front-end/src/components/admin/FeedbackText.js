import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/StaticData';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-responsive-modal';



class FeedbackText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FeedbackTexts: [],
            cupsAndPoints: [],
            open: false,
            // SRautomatic_win,
            // SRchapter_name,
            // SRcommitment_to_success,
            // SRconnection_to_yourself,
            // SRid,
            // SRmax_victory_cups,
            // SRself_fulfillment,
            // SRyour_control
            workingRow: {}
            // cupsAndPointsView: []
        };
    };

    componentDidMount() {
        this.getData();
    }


    getData = async () => {
        const response = await axios.post(
            baseUrl + 'admin/feedback_texts',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' } }
        );
        // let cupsAndPointsView = this.mapToView(response.data.rows)
        this.setState({ FeedbackTexts: response.data.rows });
        console.log(response.data.rows);
    }

    getValue = (id, propertyName) => {
        console.log(id);
        let resultObj = this.state.FeedbackTexts.find(obj => {
            return obj.id === id
        })
        console.log(resultObj);
        return resultObj.propertyName;
    }

    updateState = (e) => {
        // const objIndex = this.state.cupsAndPoints.findIndex((obj => obj.id == id));
        this.state.workingRow = { ...this.state.workingRow, [e.target.name]: e.target.value };
        // this.state.cupsAndPoints[objIndex][property] = value;
        // this.forceUpdate();
        console.log(this.state.workingRow);
    }


    updateWorkingRowInServer = async () => {
        const response = await axios.post(
            baseUrl + 'update_feedback_texts',
            { ...this.state.workingRow },
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(response.data.rows);
        this.getData();
    }



    updateWorkingRowState = (id) => {
        let workingRow = this.state.FeedbackTexts.find(obj => {
            return obj.under_or_equal_seccess_percent == id
        })
        this.setState({ workingRow });
    }


    mapToView = () => {
        console.log(this.state.FeedbackTexts);
        return this.state.FeedbackTexts.map((row) => {
            console.log(row.under_or_equal_seccess_percent);
            return (
                <tr key={row.under_or_equal_seccess_percent} >
                    <td><Button key={row.under_or_equal_seccess_percent} onClick={() => { this.setState({ open: true }); this.updateWorkingRowState(row.under_or_equal_seccess_percent) }}>ערוך</Button></td>
                    <td>{row.under_or_equal_seccess_percent}</td>
                    <td>{row.your_control}</td>
                    <td>{row.connection_to_yourself}</td>
                    <td>{row.commitment_to_success}</td>
                    <td>{row.self_fulfillment}</td>
                </tr>
            )
        }
        )
    }





    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Modal open={this.state.open} onClose={() => this.setState({ open: false })} center>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }}>
                                            <Form.Row>
                                                <Form.Group controlId="formName">
                                                    <Form.Label>שליטה עצמית</Form.Label>
                                                    <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" name='your_control' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.your_control} />
                                                </Form.Group>
                                                <Form.Group controlId="formName">
                                                    <Form.Label>חיבור עצמי</Form.Label>
                                                    <Form.Control type="text" name='connection_to_yourself' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.connection_to_yourself} />
                                                </Form.Group>
                                                <Form.Group controlId="formName">
                                                    <Form.Label>מחוייבות להצלחה</Form.Label>
                                                    <Form.Control type="text" name='commitment_to_success' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.commitment_to_success} />
                                                </Form.Group>
                                                <Form.Group controlId="formName">
                                                    <Form.Label>מימוש עצמי</Form.Label>
                                                    <Form.Control type="text" name='self_fulfillment' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.self_fulfillment} />
                                                </Form.Group>
                                                <Form.Group controlId="formGoalsAchived">
                                                    <Button variant="primary" onClick={() => { this.updateWorkingRowInServer(); this.setState({ open: false }); }}  >אישור</Button>
                                                    <Button variant="primary" onClick={() => this.setState({ open: false })} >ביטול</Button>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }} bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>עד אחוז</th>
                                    <th>שליטה עצמית</th>
                                    <th>חיבור עצמי</th>
                                    <th>מחוייבות להצלחה</th>
                                    <th>מימוש עצמי</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.mapToView()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default FeedbackText;