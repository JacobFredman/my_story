import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { MdLocalBar } from 'react-icons/md';
import { GrFormClose } from 'react-icons/gr';
import Button from 'react-bootstrap/Button';
import './Cup.css';
import axios from 'axios';
import { baseUrl } from '../../utils/StaticData';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-responsive-modal';
import Container from 'react-bootstrap/Container';
import 'react-responsive-modal/styles.css';
import Form from 'react-bootstrap/Form';




class showProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaptersAndCups: undefined,
            chaptersAndCupsView: undefined,
            open: false,
            goalsSelected: false,
            maxGoals: 0,
            numOfGoalsAchived: 0
        };
    };

    componentDidMount() {
        this.getGoalsOrHabits();
    }

    updateCups = async (chapterId, winedCups) => {
        const response = await axios.post(
            baseUrl + 'update_user_cups',
            { "newCups": winedCups, "chapterId": chapterId },
            { headers: { 'Content-Type': 'application/json' } }
        );
        this.getGoalsOrHabits();
    }

    a = (val, i) => {
        console.log(val);
        console.log(i);
        // console.log(id);
    }



    getData = async () => {
        const response = await axios.post(
            baseUrl + 'get_user_cups',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' } }
        );
        let chaptersAndCupsView = this.mapToView(response.data.rows)
        this.setState({ chaptersAndCups: response.data.rows, chaptersAndCupsView });
        // this.setState({ chaptersAndCups: response.data.rows });
        console.log(this.state.chaptersAndCups);
    }

    mapToView = (chaptersAndCups) => {
        console.log(2);
        return chaptersAndCups.map((chapter, index) => {
            return (
                <tr key={index} style={{ cursor: 'pointer' }}>
                    <td>
                        <p>{chapter.chapter_name}</p>
                        {
                            chapter.id === 11
                                ? this.golesAndHabits()
                                : ''
                        }
                    </td>
                    <td style={chapter.automatic_win ? { backgroundColor: '#e6ffe6' } : {}}>
                        {/* <td style={{ backgroundColor: 'gray' }}> */}
                        {this.buildCups.call(this, chapter.id, chapter.max_victory_cups, chapter.wined_cups)}
                    </td>
                    <td>
                        {chapter.wined_cups + '/' + chapter.max_victory_cups}
                        {
                            chapter.automatic_win
                                ? <p style={{ color: '#2eb82e' }}>זכיה אוטומטית</p>
                                : ''
                        }

                    </td>
                </tr >
            )
        })
    }


    golesAndHabits = () => {
        return (
            <ButtonGroup size="sm" vertical>
                <Button onClick={() => this.setState({ open: true, goalsSelected: true })} variant="outline-info">יעדים</Button>
                <Button onClick={() => this.setState({ goalsSelected: false })} variant="outline-info">הרגלים</Button>
            </ButtonGroup>
            // <Col onChange={this.setGender.bind(this)}>
            //     <input type="radio" value="MALE" name="gender" /> יעדים
            //     <input type="radio" value="FEMALE" name="gender" /> הרגלים
            // </Col>
        )
    }

    buildCups = (chapterId, max, wined_cups) => {
        let result = [<GrFormClose key={0} onClick={() => this.updateCups(chapterId, 0)} />];
        var i = 1;
        for (; i <= wined_cups; i++) {
            let a = i
            result.push(<MdLocalBar key={a} className='WinedCup' onClick={() => this.updateCups(chapterId, a)} />)
        }
        for (; i <= max; i++) {
            let a = i
            result.push(<MdLocalBar key={a} className='UnWinedCup' onClick={() => this.updateCups(chapterId, a)} />)
        }
        return result;
    }

    updateGoals = async () => {
        this.setState({ open: false });
        const response = await axios.post(
            baseUrl + 'update_user_goals',
            { "max_goals": this.state.maxGoals, "goals_selected": this.state.goalsSelected, "numOfGoalsAchived": this.state.numOfGoalsAchived },
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(response.data.rows);
        this.getGoalsOrHabits();
    }

    getGoalsOrHabits = async () => {
        this.setState({ open: false });
        const response = await axios.post(
            baseUrl + 'get_goals_or_habits',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' } }
        );
        this.setState({ ...response.data.val[0] });
        console.log('object');
        this.getData();
    }


    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Modal open={this.state.open} onClose={() => this.setState({ open: false })} center>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Form dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }}>
                                                    <Form.Row>
                                                        <Form.Group controlId="formMaxGoals">
                                                            <Form.Label>כמה יעדים הגדרתי</Form.Label>
                                                            <Form.Control type="number" name='maxGoals' onChange={e => { this.state.maxGoals = e.target.value }} placeholder={this.state.maxGoals} />
                                                        </Form.Group>
                                                        <Form.Group controlId="formGoalsAchived">
                                                            <Form.Label>כמה יעדים השגתי</Form.Label>
                                                            <Form.Control type="number" name='numOfGoalsAchived' onChange={e => { this.state.numOfGoalsAchived = e.target.value }} placeholder={this.state.numOfGoalsAchived} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group controlId="formGoalsAchived">
                                                            <Button variant="primary" onClick={() => this.updateGoals()}  >אישור</Button>
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

                                {console.log(3)}
                                <Table dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }} bordered hover>
                                    <thead>
                                        <tr>
                                            <th>שם הפרק</th>
                                            <th>מספר גביעים</th>
                                            <th>גביעים במספרים</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                            <td>
                                <input name='ee' value='kj'></input>
                            </td>
                        </tr> */}
                                        {this.state.chaptersAndCupsView}

                                        {/* <tr>
                            <td>מכתב פתיחה</td>
                            <td>
                                <MdLocalBar style={{ color: 'gold', height: '2em', width: '2em' }} onClick={this.a} />
                                <MdLocalBar className='WinedCup' onClick={this.a} />
                                <MdLocalBar className='UnWinedCup' />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} /></td>
                        </tr>
                        <tr>
                            <td>פרק א - סוד האושר</td>
                            <td><MdLocalBar style={{ color: 'gold', height: '2em', width: '2em' }} onClick={this.a} />
                                <MdLocalBar style={{ color: 'gold', height: '2em', width: '2em' }} />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} /></td>
                        </tr>
                        */}
                                        <tr>

                                            <td colSpan="3">
                                                <Button variant='info'>אני רוצה לראות את המצב שלי בינתיים</Button>
                                                <Button>אני רוצה לראות תוצאות סופיות</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default showProgress; 