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



class CupsAndPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            baseUrl + 'admin/cups_and_points',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' } }
        );
        // let cupsAndPointsView = this.mapToView(response.data.rows)
        this.setState({ cupsAndPoints: response.data.rows });
        console.log(response.data.rows);
    }

    getValue = (id, propertyName) => {
        console.log(id);
        let resultObj = this.state.cupsAndPoints.find(obj => {
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
            baseUrl + 'update_chapter_points_max',
            { ...this.state.workingRow },
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(response.data.rows);
        this.getData();
    }



    updateWorkingRowState = (id) => {
        let workingRow = this.state.cupsAndPoints.find(obj => {
            return obj.id === id
        })
        this.setState({ workingRow });
        console.log(workingRow);
    }


    mapToView = () => {
        let cap = this.state.cupsAndPoints;
        console.log(this.state.cupsAndPoints);
        return this.state.cupsAndPoints.map((chapter) => {
            return (
                <tr key={chapter.id} >
                    <Button key={chapter.id} onClick={() => { this.setState({ open: true }); this.updateWorkingRowState(chapter.id) }}>ערוך</Button>
                    <td>{chapter.chapter_name}</td>
                    <td>{chapter.max_victory_cups}</td>
                    <td>{chapter.automatic_win ? 'כן' : ''}</td>
                    <td>{chapter.your_control}</td>
                    <td>{chapter.connection_to_yourself}</td>
                    <td>{chapter.commitment_to_success}</td>
                    <td>{chapter.self_fulfillment}</td>
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
                                {/* <Row>
                                    <Col> */}
                                <Form dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <Form.Row>
                                        <Form.Group controlId="formName">
                                            <Form.Label>שם הפרק</Form.Label>
                                            <Form.Control size="sm" type="text" name='chapter_name' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.chapter_name} />
                                        </Form.Group>
                                        <Form.Group controlId="formGoalsAchived">
                                            <Form.Label>מספר גביעים מקסימלי</Form.Label>
                                            <Form.Control size="sm" type="number" name='max_victory_cups' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.max_victory_cups} />
                                        </Form.Group>
                                        {/* <Form.Group controlId="formAutoWin">
                                                    <Form.Label>זכיה אוטומטית</Form.Label>
                                                    <Form.Control type="number" name='automatic_win' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.automatic_win} />
                                                </Form.Group> */}
                                        <Form.Group as={Col} controlId="formBasicCheckbox">
                                            <Form.Check name='automatic_win' type="checkbox" label="זכיה אוטומטית" />
                                        </Form.Group>
                                        <Form.Group controlId="formSelfControl">
                                            <Form.Label>שליטה עצמית</Form.Label>
                                            <Form.Control size="sm" type="number" name='your_control' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.your_control} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="formSelfConnection">
                                            <Form.Label>חיבור עצמי</Form.Label>
                                            <Form.Control size="sm" type="number" name='connection_to_yourself' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.connection_to_yourself} />
                                        </Form.Group>
                                        <Form.Group controlId="formSelfConnection">
                                            <Form.Label>מחוייבות להצלחה</Form.Label>
                                            <Form.Control size="sm" type="number" name='commitment_to_success' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.commitment_to_success} />
                                        </Form.Group>
                                        <Form.Group controlId="formGoalsAchived">
                                            <Form.Label>מימוש עצמי</Form.Label>
                                            <Form.Control size="sm" type="number" name='self_fulfillment' onChange={e => this.updateState(e)} defaultValue={this.state.workingRow.self_fulfillment} />
                                        </Form.Group>
                                        <Form.Group controlId="formGoalsAchived">
                                            <Button size="sm" variant="primary" onClick={() => { this.updateWorkingRowInServer(); this.setState({ open: false }); }}  >אישור</Button>
                                            <Button size="sm" variant="primary" onClick={() => this.setState({ open: false })} >ביטול</Button>
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                                {/* </Col>
                                </Row> */}
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
                                    <th>שם הפרק</th>
                                    <th>מספר גביעים מקסימלי</th>
                                    <th>זכיה אוטמטית</th>
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

export default CupsAndPoints;