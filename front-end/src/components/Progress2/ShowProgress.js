import React, { useEffect, useState, useContext } from 'react';
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
import QuickFillCupsBtn from '../someBtns/QuickFillCupsBtn';
import ResetCups from '../myProgress/ResetCups';
import App from '../../App';
import { HashRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';
import Example2 from '../helpComponents/Example2';
import FirebaseContext from '../Firebase/context';
import NavBarDesigned2 from '../../components/NavBarDesigned2';
import queryString from 'query-string';
import botImg from '../../Photos/bot.jpg'; // with import
import ConncetToBotBtn from '../someBtns/ConncetToBotBtn';
import { readCookie } from '../../utils/helper';
// import logoNaama from '../../Photos/logoNaamaMdr.png'; // with import
import Credit from '../someBtns/Credit';









const ShowProgress = (props) => {
    const firebase = useContext(FirebaseContext);
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const userId = useSelector(state => state.tokenAndDetails.userId);
    const [showFeedback, setshowFeedback] = useState(false);
    const [shoeNewUserMsg, setShoeNewUserMsg] = useState(false);
    const [showNotFinishedTheJurnyMsg, setShowNotFinishedTheJurnyMsg] = useState(false);
    const [loading, setLoading] = useState(false);
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
            props.history.push("/sign_in");
            console.log('401');
        }
        if (msg.data === 200)
            console.log('ok');
        // alert('not auth');
    }



    const actBasedOnUrlParams = () => {
        const value = queryString.parse(props.location.search);

        if (value.showFiddbackText && chaptersAndCups) {
            onPersonalDevelopmentTextbunClick();
        }

        const isNewUser = value.isNewUser;
        if (isNewUser) {
            setShoeNewUserMsg(true);
            props.history.push("/");
        }
    }



    useEffect(() => {
        goToLogInIfNotUser();
        actBasedOnUrlParams();
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


    const onPersonalDevelopmentTextbunClick = () => {
        console.log(getChapterLastReaded());
        if (getChapterLastReaded().id !== 28)
            setShowNotFinishedTheJurnyMsg(true);
        else
            setshowFeedback(true);
    }

    const NewUserMsg = () => {
        if (shoeNewUserMsg)
            return (
                <Example2
                    text="היי חבר! אני הבוט של 'הסטורי שלי'
                    התפקיד שלי הוא ללוות אותך במסע ולעזור לך במילוי הגביעים.
                    יחד נגיע לפסגות חדשות ונגשים ים של חלומות!
                    גם אם לא תרצה להשתמש בי- תוכל למלא גביעים באמצעות כלי המילוי מהיר שלנו."
                    header="!ברוך הבא חבר"
                    icon={botImg}
                    open={shoeNewUserMsg}
                    setOpen={setShoeNewUserMsg}
                    onAccept={() => { window.open("https://m.me/MyStory.Book.Bot?ref=refreshToken--" + readCookie('refreshToken'), "_blank"); setShoeNewUserMsg(false); }}
                    cencelBtn={true}
                    okBtnText='אשמח שתעזור לי' />)
        return '';
    }


    // <CupsAccumulation></CupsAccumulation> immedietly after h4's



    return (
        <>
            <Row>
                <Col >
                    <NewUserMsg />
                    <Row>
                        <Col style={{ padding: 0 }}>
                            <UpLine />
                        </Col>
                        {console.log(firebase)}
                    </Row>
                    <Row>
                        <Col style={{ padding: '0' }}><NavBarDesigned2 history={props.history} /></Col>
                    </Row>

                    <Row  >
                        <Col xs={12} md={7} style={{ backgroundColor: '#E4E2F230', paddingTop: '30px' }}>
                            <ProgressesBars />
                        </Col>
                        <Col xs={12} md={5} style={{ backgroundColor: '#E4E2F2C2', textAlign: 'center', paddingTop: '30px', paddingBottom: '10px' }}>
                            <Row>
                                <Col></Col>
                                <Col xs="auto">
                                    <Row>
                                        <Col>
                                            <div style={{ height: '200px', width: '200px', marginTop: '20px' }}>
                                                {chaptersAndCups ? <PictureOfPart width={200} /> : <Spinner animation="grow" />}

                                            </div>
                                        </Col>
                                        <Col xs="auto">
                                            <IoIosPin size="5em" style={{ color: '#C68E30' }}></IoIosPin>
                                            <h4 className="youInText" style={{ color: '#C68E30', textAlign: 'center', fontFamily: 'Avigul' }}>אתה נמצא</h4>
                                            <h4 className="youInText" style={{ color: '#C68E30', textAlign: 'center', fontFamily: 'Avigul' }}>{chaptersAndCups ? getChapterLastReaded().part_number + ' בחלק' : <Spinner animation="border" />}</h4>
                                            <h4 className="youInText" style={{ color: '#C68E30', textAlign: 'center', fontFamily: 'Avigul' }}>
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
                        <Col xs={10} md={4} >
                            <Example2
                                text="עליך לסיים את המסע לפני שתוכל לראות את הפידבק"
                                header="טרם סיימת את המסע"
                                open={showNotFinishedTheJurnyMsg}
                                setOpen={setShowNotFinishedTheJurnyMsg}
                                onAccept={() => { return; }}
                                cencelBtn={false}
                                okBtnText='אישור'
                            />
                            {chaptersAndCups ?
                                <div onClick={() => onPersonalDevelopmentTextbunClick()} name='personalDevelopmentTextbun' className="btnFiddback" style={{ marginTop: '50px', marginBottom: '50px', border: 'none' }} > ניתוח ההתפתחות האישי שלי </div>
                                : ''
                            }
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            {showFeedback
                                ?
                                <>
                                    <div style={{ direction: 'rtl' }}>
                                        <Row ><Col> <FeadbackTextArea parameterName="your_control" headerColor="#0088CE" /></Col></Row>
                                        <Row ><Col><FeadbackTextArea parameterName="connection_to_yourself" headerColor="#48C2C5" /></Col></Row>
                                        <Row ><Col><FeadbackTextArea parameterName="commitment_to_success" headerColor="#F27652" /></Col></Row>
                                        <Row ><Col><FeadbackTextArea parameterName="self_fulfillment" headerColor="#AB3C96" /></Col></Row>
                                    </div>
                                </>
                                : ''
                            }
                        </Col>
                    </Row>

                    <Row className='justify-content-center'>
                        <Col xs='auto' style={{ marginBottom: '20px' }}><QuickFillCupsBtn history={props.history} /></Col>

                    </Row>
                    <Row className='justify-content-center'>
                        <Col style={{ marginBottom: '20px', textAlign: 'center' }}>
                            {/* <ResetCups />
                            <ConncetToBotBtn /> */}
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col style={{ textAlign: 'center' }}>
                            {/* <Credit /> */}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default ShowProgress;