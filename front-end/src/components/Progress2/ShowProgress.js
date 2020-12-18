import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBarDesigned from '../NavBarDesigned';
import ProgressesBars from '../helpComponents/ProgressesBars';
import CupsAccumulation from '../helpComponents/CupsAccumulation';
import Container from 'react-bootstrap/Container';
import { IoIosPin } from "react-icons/io";
import UpLine from '../helpComponents/UpLine';
import TableCupsBottom from '../myProgress/TableCupsBottom';
import { getChaptersAndCups } from '../myProgress/UpdateCups';
import { useSelector, useDispatch } from 'react-redux';
import YouInPart2 from '../../Photos/YouInPhotos/YouInPart2';
import YouInPart1 from '../../Photos/YouInPhotos/YouInPart1';
import YouInPart3 from '../../Photos/YouInPhotos/YouInPart3';
import YouInPart4 from '../../Photos/YouInPhotos/YouInPart4';
import YouInPart5 from '../../Photos/YouInPhotos/YouInPart5';
import YouInPart6 from '../../Photos/YouInPhotos/YouInPart6';
import YouInPart7 from '../../Photos/YouInPhotos/YouInPart7';
import './MainPage.css';
import Acordion from '../../TextFeadbeack/Acordion';
import FeadbackTextArea from '../../../src/TextFeadbeack/FeadbackTextArea';
import Button from 'react-bootstrap/Button';
import { is_user } from '../myProgress/UpdateCups';




const ShowProgress = (props) => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const [showFeedback, setshowFeedback] = useState(false);
    const dispatch = useDispatch();

    const getChapterLastReaded = () => {

        let max_of_array = Math.max.apply(Math, chaptersAndCups.map(chapter => chapter.is_readed ? chapter.id : 0));
        if (max_of_array <= 0)
            max_of_array = 1;
        const lastChapter = chaptersAndCups.find(chapter => chapter.id === max_of_array);
        console.log(lastChapter);
        return lastChapter;
    }


    const getFirstPartOfNameFromChapter = chapter => {
        const breakNameInd = chapter.chapter_name.indexOf("-") === -1
            ?
            chapter.chapter_name.length
            :
            chapter.chapter_name.indexOf("-");

        return chapter.chapter_name.substring(0, breakNameInd);
    }

    const getData = async () => {
        // await getGoalsOrHabits();
        const rowsData = await getChaptersAndCups();
        dispatch({ type: 'CHAPTERSANDCUPS', val: rowsData.data.rows });
    }

    const goToLogInIfNotUser = async () => {
        const msg = await is_user();
        console.log(msg);
        if (msg === '401' || msg.data === 401) {
            props.history.push("/sign_in/");
            console.log('401');
        }
        if (msg.data === 200)
            console.log('ok');
        // alert('not auth');
    }


    useEffect(() => {
        goToLogInIfNotUser();
        getData();
    }, []);


    const PictureOfPart = (props) => {
        console.log(getChapterLastReaded().part_number);
        if (getChapterLastReaded().part_number === 1)
            return <YouInPart1 width={props.width} />
        if (getChapterLastReaded().part_number === 2)
            return <YouInPart2 width={props.width} />
        if (getChapterLastReaded().part_number === 3)
            return <YouInPart3 width={props.width} />
        if (getChapterLastReaded().part_number === 4)
            return <YouInPart4 width={props.width} />
        if (getChapterLastReaded().part_number === 5)
            return <YouInPart5 width={props.width} />
        if (getChapterLastReaded().part_number === 6)
            return <YouInPart6 width={props.width} />
        if (getChapterLastReaded().part_number === 7)
            return <YouInPart7 width={props.width} />
        return <YouInPart1 />
    }



    // <CupsAccumulation></CupsAccumulation> immedietly after h4's



    return (

        <React.Fragment>
            <Row>
                <Col>
                    <UpLine />
                    <NavBarDesigned></NavBarDesigned>
                    <Row  >
                        {/* <Col xs="auto" md={7} style={{ backgroundColor: '#E4E2F230', paddingTop: '30px' }}> */}
                        <Col xs={12} md={7} style={{ backgroundColor: '#E4E2F230', paddingTop: '30px' }}>
                            <ProgressesBars />

                        </Col>
                        <Col xs="auto" md={5} style={{ backgroundColor: '#E4E2F2C2', textAlign: 'center', paddingTop: '30px', paddingBottom: '10px' }}>
                            <Row>
                                <Col></Col>
                                <Col xs="auto">
                                    <Row>
                                        <Col>
                                            <div style={{ height: '200px', width: '200px', marginTop: '20px' }}>
                                                {chaptersAndCups ? <PictureOfPart width={200} /> : ''}

                                            </div>
                                        </Col>
                                        <Col xs="auto">
                                            <IoIosPin size="5em" style={{ color: '#C68E30' }}></IoIosPin>
                                            <h4 className="youInText" style={{ color: '#C68E30' }}>אתה נמצא</h4>
                                            <h4 className="youInText" style={{ color: '#C68E30' }}>{chaptersAndCups ? getChapterLastReaded().part_number + ' בחלק' : ''}</h4>
                                            <h4 className="youInText" style={{ color: '#C68E30' }}>
                                                {chaptersAndCups ? getFirstPartOfNameFromChapter(getChapterLastReaded()) : ''}
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <CupsAccumulation></CupsAccumulation>

                                        </Col>
                                    </Row>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Col>

                    </Row>

                    <Row>
                        <Col></Col>
                        <Col xs={8} md={4} >
                            <div onClick={() => setshowFeedback(!showFeedback)} className="btnFiddback" style={{ marginTop: '50px', marginBottom: '50px' }} > !ניתוח ההתפתחות האישי שלי </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            {showFeedback
                                ?
                                <>
                                    <FeadbackTextArea parameterName="your_control" headerColor="#0088CE" />
                                    <FeadbackTextArea parameterName="connection_to_yourself" headerColor="#48C2C5" />
                                    <FeadbackTextArea parameterName="commitment_to_success" headerColor="#F27652" />
                                    <FeadbackTextArea parameterName="self_fulfillment" headerColor="#AB3C96" />
                                </>
                                : ''
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={() => props.history.push("/show_progress2")}> למילוי מהיר של הגביעים לחץ כאן </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment >
    );
};

export default ShowProgress;