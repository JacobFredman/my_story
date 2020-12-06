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
import NavBarDesigned from '../NavBarDesigned';
import Helmet from 'react-helmet';
// import Background from '../../Photos/background-image-silver-snow.jpg';
import Background from '../../Photos/whatsppBackground.jpg';




class showProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaptersAndCups: undefined,
            chaptersAndCupsView: undefined,
            open: false,
            goalsSelected: false,
            goalsOrHabitsChapterId: 11,
            maxGoals: 0,
            numOfGoalsAchived: 0
        };
    };

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await this.getGoalsOrHabits();
        await this.getChaptersAndCups();
    }


    updateCups = async (chapterId, winedCups) => {
        await axios.post(
            baseUrl + 'update_user_cups',
            { "newCups": winedCups, "chapterId": chapterId },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
        this.getData();
    }


    getChaptersAndCups = async () => {
        const response = await axios.post(
            baseUrl + 'get_user_cups',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            // { headers: { 'Content-Type': 'application/json' } }
        );
        this.setState({ chaptersAndCups: response.data.rows });

    }

    mapToView = () => {
        return this.state.chaptersAndCups.map((chapter, index) => {
            return (
                <tr key={index} style={{ cursor: 'pointer' }}>
                    <td>
                        {this.chapterNameCol(chapter.id, chapter.chapter_name)}
                    </td>
                    {/* <td> */}
                    {this.cupsCol.call(this, chapter.id, chapter.max_victory_cups, chapter.wined_cups, chapter.automatic_win)}
                    {/* </td> */}
                    <td>
                        {chapter.wined_cups + '/' + chapter.max_victory_cups}
                        {
                            chapter.automatic_win
                                ? (<p style={{ fontSize: 'x-small' }}>זכיה אוטומטית</p>)
                                : null
                        }
                    </td>
                </tr >
            )
        })
    }

    onGoalsSelectedClick = () => {
        this.setState({ open: true });
    }

    onHabitsSelectedClick = () => {
        this.setState({ goalsSelected: false });
        this.updateGoals(false);
    }


    chapterNameCol = (chapterId, chapterName) => {
        // const chapter_name = (<Row key={1}><Col> <p>{chapterName}</p></Col></Row>);
        const breakNameInd = chapterName.indexOf("-") === -1 ? chapterName.length : chapterName.indexOf("-")
        const chapter_name = (<Row key={1}><Col>
            <h6 style={{ marginBottom: '0px' }}>{chapterName.substring(0, breakNameInd)}</h6>
            <p style={{ marginBottom: '0px' }}>{chapterName.substring(breakNameInd + 1, chapterName.length)}</p>
        </Col></Row>);
        const golasOrHabitsChapterButtons =
            (<Row key={2}>
                <Col>
                    <ButtonGroup size="sm" vertical>
                        <Button onClick={() => this.onGoalsSelectedClick()}
                            variant={this.state.goalsSelected ? "info" : "outline-secondary"}>יעדים</Button>
                        <Button onClick={() => this.onHabitsSelectedClick()}
                            variant={this.state.goalsSelected ? "outline-secondary" : "info"}>הרגלים</Button>
                    </ButtonGroup>
                </Col>
            </Row>);


        if (chapterId === this.state.goalsOrHabitsChapterId) {
            return [chapterName, golasOrHabitsChapterButtons];
        }
        return chapter_name;
        // <Col onChange={this.setGender.bind(this)}>
        //     <input type="radio" value="MALE" name="gender" /> יעדים
        //     <input type="radio" value="FEMALE" name="gender" /> הרגלים
        // </Col>
    }

    cupsCol = (chapterId, max, wined_cups, automatic_win) => {
        let tdTagStyle = {};
        if (automatic_win)
            tdTagStyle = { backgroundColor: '#e6ffe6' }
        if (chapterId === this.state.goalsOrHabitsChapterId && this.state.goalsSelected)
            tdTagStyle = { backgroundColor: '#bfbfbf' };

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

        return <td style={tdTagStyle}> {result} </td>;
    }

    updateGoals = async (goals_selected) => {
        this.setState({ open: false });
        await axios.post(
            baseUrl + 'update_user_goals',
            { "max_goals": this.state.maxGoals, "goals_selected": goals_selected, "numOfGoalsAchived": this.state.numOfGoalsAchived },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
    }

    getGoalsOrHabits = async () => {
        const response = await axios.post(
            baseUrl + 'get_goals_or_habits',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            // { headers: { 'Content-Type': 'application/json' } }
        );
        this.setState({ ...response.data.val[0], open: false });
    }


    handleGoalsNum = event => {
        let { value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        this.setState({ maxGoals: value });
    };

    handleNumOfGoalsAchived = event => {
        let { value, min } = event.target;
        value = Math.max(Number(min), Math.min(this.state.maxGoals, Number(value)));

        this.setState({ numOfGoalsAchived: value });
    };



    render() {
        return (
            <React.Fragment >
                {/* <Row style={{ backgroundImage: "transparent url(" + Background + ")" }}> */}
                <Row style={{
                    background: 'transparent url(' + Background + ') 0% 0% padding-box'
                }}>
                    <Col>
                        {/* <Helmet bodyAttributes={{ style: 'background: transparent linear-gradient(45deg, #8BBF3F 0%, #43C2CF 100%) 0% 0% no-repeat padding-box' }} /> */}
                        <div style={{
                            // top: '-30px',
                            width: '100%',
                            height: '15px',
                            // float: 'left',
                            // background: 'transparent linear-gradient(88deg, #F15F33 0%, #BF1A84 100%) 0% 0% no-repeat padding-box',
                            background: 'transparent linear-gradient(88deg, #F15F33 0%, #BF1A84 100%) ',
                            borderRadius: '66px',
                            opacity: '1'
                        }}>
                        </div>
                        <NavBarDesigned></NavBarDesigned>
                        <Row>
                            <Col>
                                <Modal open={this.state.open} onClose={() => this.setState({ open: false })} center>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Form dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formMaxGoals">
                                                            <Form.Label>כמה יעדים הגדרתי</Form.Label>
                                                            {/* <Form.Control type="number" min='0' max='30' name='maxGoals' onChange={e => { this.state.maxGoals = e.target.value }} defaultValue={this.state.maxGoals} /> */}
                                                            <Form.Control type="number" min='0' max='30' name='maxGoals' onChange={e => { this.handleGoalsNum(e) }} value={this.state.maxGoals} />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGoalsAchived">
                                                            <Form.Label>כמה יעדים השגתי</Form.Label>
                                                            <Form.Control type="number" min='0' name='numOfGoalsAchived' onChange={e => { this.handleNumOfGoalsAchived(e) }} value={this.state.numOfGoalsAchived} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group controlId="formGoalsAchived">
                                                            <Button variant="primary" onClick={() => { this.updateGoals(true); this.getData(); }}  >אישור</Button>
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
                            <Col></Col>
                            <Col xs="auto" md={7}>
                                <div style={{ width: '100%', background: '#FFFFFF', height: '20px', marginTop: '30px' }}>

                                </div>
                                <Table dir='rtl' style={{ direction: 'rtl', textAlign: 'right', background: '#FFFFFF' }} hover>
                                    <thead>
                                        <tr style={{ background: '#F6F9FF 0% 0% no-repeat padding-box', color: '#24A3AA' }}>
                                            <th>שם הפרק</th>
                                            <th>מספר הגביעים שצברת</th>
                                            <th>צבירה</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.chaptersAndCups !== undefined ? this.mapToView() : null}
                                        <tr>
                                            <td colSpan="3">
                                                <Button onClick={() => this.props.history.push("/user_statistics")}>אני רוצה לראות את המצב שלי</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment >
        );
    }
}

export default showProgress; 