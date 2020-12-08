import React, { Component, useRef } from 'react';
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
import Background from '../../Photos/backGroundWhatsApp1.svg';
import Cup from '../helpComponents/Cup';
import './ShowProgress.css';
import AllRotatedPartsNames from '../helpComponents/AllRotatedPartsNames';
import ButtonFiddbackText from '../helpComponents/ButtonFiddbackText';
import BackGroundLeftRoad from '../../Photos/BackGroundLeftRoad.svg';





class showProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaptersAndCups: undefined,
            chaptersAndCupsView: undefined,
            ChapterNumberBeginOfPart: [5, 9, 15, 20, 23, 26, 27],
            refsToBeginOfParts: [],
            beginOfPartsPostions: [],
            open: false,
            goalsSelected: false,
            goalsOrHabitsChapterId: 11,
            maxGoals: 0,
            numOfGoalsAchived: 0,
        };
    };


    componentDidMount() {
        this.getData();
    }

    getPositions = () => {
        let a = [];
        if (this.state.refsToBeginOfParts[3]) {
            console.log(this.state.refsToBeginOfParts[3]);
            // console.log(window.scrolly + this.state.refsToBeginOfParts[3].getBoundingClientRect().top);
            for (let i = 0; i < 6; i++) {

                // this.state.beginOfPartsPostions[i] = window.scrolly + this.state.refsToBeginOfParts[i].getBoundingClientRect().top;
                a[i] = this.state.refsToBeginOfParts[i].getBoundingClientRect().top;
                // + this.state.refsToBeginOfParts[i].getBoundingClientRect()
            }
            console.log(a);
            this.setState({ beginOfPartsPostions: [...a] });
        }
    }

    getData = async () => {
        await this.getGoalsOrHabits();
        await this.getChaptersAndCups();
        this.getPositions();
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
        const chapter_name = (
            <Row key={1}><Col>
                {this.state.ChapterNumberBeginOfPart.includes(chapterId) ?
                    <div ref={ele => (this.state.refsToBeginOfParts[this.state.ChapterNumberBeginOfPart.findIndex(i => i === chapterId)] = ele)} id={'chapter' + chapterId} style={{ height: '10px', width: '10px', backgroundColor: 'blue' }}></div>
                    : ''
                }
                {console.log(this.state.refsToBeginOfParts)}
                <h6 className="chapterName">{chapterName.substring(0, breakNameInd)}</h6>
                <p className="chapterNameSecondery" style={{ marginBottom: '0px' }}>{chapterName.substring(breakNameInd + 1, chapterName.length)}</p>
            </Col></Row>
        );

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
            // result.push(<MdLocalBar key={a} className='WinedCup' onClick={() => this.updateCups(chapterId, a)} />)
            result.push(<Cup key={a} height={25} marginPx={3} gold={true} onClick={() => this.updateCups(chapterId, a)} />)
        }
        for (; i <= max; i++) {
            let a = i
            // result.push(<MdLocalBar key={a} className='UnWinedCup' onClick={() => this.updateCups(chapterId, a)} />)
            result.push(<Cup key={a} height={25} marginPx={3} gold={false} onClick={() => this.updateCups(chapterId, a)} />)
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
        { console.log('rendered') }
        return (
            <React.Fragment >
                {/* <Row style={{ backgroundImage: "transparent url(" + Background + ")" }}> */}
                <Row className="backStyle" style={{
                    // background: 'transparent url(' + Background + ') 0% 0% padding-box'
                    // background: 'transparent url(' + Background + '), url(' + BackGroundLeftRoad + ') left bottom no-repeat'
                    // background: 'url(' + BackGroundLeftRoad + ') left bottom no-repeat'
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
                            <Col xs={10} md={7} style={{ paddingRight: '0' }}>
                                <Table size="sm" dir='rtl' style={{ direction: 'rtl', textAlign: 'right', background: '#FFFFFF', boxShadow: '0px 0px 20px #00000029', marginTop: '30px' }} hover>
                                    <thead>
                                        <tr>
                                            <td>
                                                <div style={{ height: '20px' }}></div>
                                            </td>
                                        </tr>
                                        <tr style={{ background: '#F6F9FF 0% 0% no-repeat padding-box', color: '#24A3AA' }}>
                                            <th className="headerTable">שם הפרק</th>
                                            <th className="headerTable">מספר הגביעים שצברת</th>
                                            <th className="headerTable">צבירה</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.chaptersAndCups !== undefined ? this.mapToView() : null}
                                        <tr >
                                            <td colSpan="3">
                                                <Container>
                                                    <Row style={{ direction: 'rtl' }}>
                                                        <Col></Col>
                                                        <Col xs={8}>
                                                            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                                                                <ButtonFiddbackText onClick={() => this.props.history.push("/user_statistics")} />
                                                            </div>
                                                        </Col>
                                                        <Col><p style={{ font: 'normal normal 600 16px/13px Assistant', color: '#AB3C96', position: 'absolute', top: '20%' }}>אפס מסע</p></Col>
                                                    </Row>
                                                </Container>
                                                {/* <Button onClick={() => this.props.history.push("/user_statistics")}>אני רוצה לראות את המצב שלי</Button> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs={1} style={{ paddingLeft: '0', paddingRight: '0' }}>
                                {this.state.beginOfPartsPostions[3] !== undefined ? console.log(this.state.beginOfPartsPostions[0]) : console.log('undefined')}

                                {this.state.beginOfPartsPostions[3] !== undefined ?
                                    <AllRotatedPartsNames
                                        part1YLocation={this.state.beginOfPartsPostions[0]}
                                        part2YLocation={this.state.beginOfPartsPostions[1]}
                                        part3YLocation={this.state.beginOfPartsPostions[2]}
                                        part4YLocation={this.state.beginOfPartsPostions[3]}
                                        part5YLocation={this.state.beginOfPartsPostions[4]}
                                        part6YLocation={this.state.beginOfPartsPostions[5]}
                                        part7YLocation={this.state.beginOfPartsPostions[6]}
                                        part8YLocation={this.state.beginOfPartsPostions[7]} />
                                    : ''
                                }
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