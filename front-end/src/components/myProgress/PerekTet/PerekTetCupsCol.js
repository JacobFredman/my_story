import React, { useState, useEffect } from 'react';
import './PerekTetCupsCol.css';
import CupsCol from '../CupsCol';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RotatedPartName from '../../helpComponents/RotatedPartName';
import { is } from 'immutable';
import { updateCupsServer } from '../UpdateCups';
import ReactTooltip from 'react-tooltip';
// import "../myProgress/tooltip.css";
import "../../myProgress/tooltip.css";
import { updateGoalsOrHobitsServer, getGoalsOrhabits } from '../UpdateCups';
import { Alert } from 'antd';





const maxgoals = 30;
let autoFocusOn;

const PerekTetCupsCol = (props) => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const dispatch = useDispatch();
    // const perekTet = chaptersAndCups.find(chapter => chapter.id === 11);

    const [achivedgoals, setAchivedgoals] = useState();
    const [goalesNum, setgoalesNum] = useState();
    const [tooManyAchivedGoals, setTooManyAchivedGoals] = useState(false);

    const [goalsSelected, setgoalsSelected] = useState(false);
    const [victory_cups_wined, setvictory_cups_wined] = useState(1);


    useEffect(() => {
        getData();
    }, []);


    const updategoalsOrHobits = isGoalsSelected => {
        setgoalsSelected(isGoalsSelected);
        // dispatch({ type: 'GoalsOrHabitChangedInfromColoredDivs' });
        updateGoalsOrHobitsServer(isGoalsSelected, goalesNum, achivedgoals);
    }

    // const Updateachivedgoals = (achivedgoalsParam) => {
    //     if (achivedgoalsParam > maxgoals || achivedgoals > goalesNum)
    //         setAchivedgoals(Math.min(maxgoals, goalesNum));
    //     else
    //         setAchivedgoals(achivedgoalsParam);

    //     updateCups();
    // }

    const updateCupsClient = (goalesNumParam, achivedgoalsParam) => {
        const victory_cups_wined = parseInt((achivedgoalsParam / goalesNumParam) * parseInt(props.chapter.max_victory_cups));
        // setvictory_cups_wined(cupsNum);
        dispatch({ type: 'UPDATEWINEDCUPSCHAPTER', chapterId: 11, victory_cups_wined });
    }

    const updateGoalsOrHobits = async (goalesNumParam, achivedgoalsParam) => {
        updateCupsClient(goalesNumParam, achivedgoalsParam);
        updateGoalsOrHobitsServer(goalsSelected, goalesNumParam, achivedgoalsParam);
    }


    const getData = async () => {
        const response = await getGoalsOrhabits();
        // dispatch({ type: 'CHAPTERSANDCUPS', val: rowsData.data.rows });
        const data = response.data.val[0];
        setgoalsSelected(parseInt(data.goalsSelected));
        setgoalesNum(parseInt(data.maxGoals));
        setAchivedgoals(
            getCalculatedAchivedGoals(parseInt(data.maxGoals))
        );
    }


    const getCalculatedAchivedGoals = (maxGoalsParam) => {
        return parseInt((maxGoalsParam * props.chapter.victory_cups_wined)
            /
            props.chapter.max_victory_cups);
    }



    const ongoalesNumInputChange = (e) => {
        // e.preventDefault();
        const val = e.target.value;
        autoFocusOn = "goalesNumInput";
        let resultVal = parseInt(val);
        if (val < 0)
            resultVal = 0;
        // if (achivedgoals && val < achivedgoals)
        //     // resultVal = achivedgoals;
        //     setAchivedgoals(resultVal);
        // if (val > maxgoals)
        //     resultVal = maxgoals;
        if (!val || !goalesNum)
            dispatch({ type: 'UPDATEWINEDCUPSCHAPTER', chapterId: 11, victory_cups_wined: 0 });


        setgoalesNum(resultVal);
        if (parseInt(achivedgoals) > resultVal) {
            setTooManyAchivedGoals(true);
            dispatch({ type: 'UPDATEWINEDCUPSCHAPTER', chapterId: 11, victory_cups_wined: 0 });
        }
        else {
            setTooManyAchivedGoals(false);
            updateGoalsOrHobits(resultVal, parseInt(achivedgoals));
            // const victory_cups_wined = parseInt((parseInt(achivedgoals) / resultVal) * parseInt(props.chapter.max_victory_cups));
            // dispatch({ type: 'UPDATEWINEDCUPSCHAPTER', chapterId: 11, victory_cups_wined });
        }

    }

    const onAchivedgoalsInputChange = (e) => {
        // e.preventDefault();
        const val = e.target.value;
        let resultVal = parseInt(val);
        autoFocusOn = "achivedgoalsInput";
        if (val < 0)
            resultVal = 0;

        if (!val || !goalesNum)
            dispatch({ type: 'UPDATEWINEDCUPSCHAPTER', chapterId: 11, victory_cups_wined: 0 });


        if (resultVal > parseInt(goalesNum)) {
            setTooManyAchivedGoals(true);
            dispatch({ type: 'UPDATEWINEDCUPSCHAPTER', chapterId: 11, victory_cups_wined: 0 });
        }
        else {
            setTooManyAchivedGoals(false);
            updateGoalsOrHobits(parseInt(goalesNum), resultVal);
        }


        setAchivedgoals(resultVal);
        // setAchivedgoals(100);
    }




    const GoalsOrgoalsBtns = () => {
        return <Row>
            <Col className="goalsOrHobitsBtnsContainer">
                <div onClick={() => updategoalsOrHobits(true)} className={goalsSelected ? "goalsOrHobitsBtn activeBtn" : "notActiveBtn goalsOrHobitsBtn"}>שלבים</div>
                <div onClick={() => updategoalsOrHobits(false)} className={goalsSelected ? "notActiveBtn goalsOrHobitsBtn" : "goalsOrHobitsBtn activeBtn"}>הרגלים</div>
                {tooManyAchivedGoals ?
                    <Alert style={{ fontSize: '7px' }} message="מספר השלבים שהשגת לא יכול להיות גדול ממספר השלבים שהגדרת" type="error" />
                    : ''
                }

            </Col>
        </Row>
    }

    // const GoalsInputs = () => {
    //     return <div className="goalsOrHobitsBtnsContainer">
    //         <input  autoFocus={autoFocusOn === "goalesNumInput"} key="goalesNumInput" value={goalesNum} onChange={e => ongoalesNumInputChange(e)}
    //             // type="text" autoFocus={() => autoFocusOn === "goalesNumInput"} className="goalsOrgoalsInput" placeholder="הקלד יעדים שהגדרת"></input>
    //             type="text" className="goalsOrHobitsInput" placeholder="הקלד יעדים שהגדרת"></input>

    //         {/* <input autoFocus={autoFocusOn === "achivedgoalsInput"} key="achivedgoalsInput" value={achivedgoals} onChange={e => onAchivedgoalsInputChange(e)} onChange={e => Updateachivedgoals(e.target.value)} */}
    //         <input autoFocus={autoFocusOn === "achivedgoalsInput"} key="achivedgoalsInput" value={achivedgoals} onChange={e => onAchivedgoalsInputChange(e)}
    //             // type="text" autoFocus={() => autoFocusOn === "achivedgoalsInput"} className="goalsOrgoalsInput" placeholder="הקלד יעדים שהשגת"></input>
    //             type="text" className="goalsOrHobitsInput" placeholder="הקלד יעדים שהשגת"></input>
    //     </div>
    // }
    const GoalsInputs = () => {
        return <div className="goalsOrHobitsBtnsContainer">
            <ReactTooltip />
            <input key="goalesNumInput" type="number" value={goalesNum} onChange={e => { ongoalesNumInputChange(e) }}// onChange={e => { setgoalesNum(e.target.value); autoFocusOn = "goalesNumInput" }}
                autoFocus={autoFocusOn === "goalesNumInput"}
                className="goalsOrHobitsInput goalsOrHobitsInputOkStatus"
                data-tip='הקלד שלבים שהגדרת'
                placeholder="הקלד"></input>
            {/* className="goalsOrHobitsInput" placeholder="הקלד שלבים שהגדרת"></input> */}

            {/* <input autoFocus={autoFocusOn === "achivedgoalsInput"} key="achivedgoalsInput" value={achivedgoals} onChange={e => onAchivedgoalsInputChange(e)} onChange={e => Updateachivedgoals(e.target.value)} */}
            <input type="number" key="achivedgoalsInput" value={achivedgoals} onChange={e => onAchivedgoalsInputChange(e)} data-tip='הקלד שלבים שהשגת' //onChange={e => { setAchivedgoals(e.target.value); autoFocusOn = "achivedgoalsInput" }} value={achivedgoals}
                autoFocus={autoFocusOn === "achivedgoalsInput"}
                className={tooManyAchivedGoals ? "goalsOrHobitsInput goalsOrHobitsInputWarningStatus" : "goalsOrHobitsInput goalsOrHobitsInputOkStatus"}
                placeholder="הקלד"
            ></input>
        </div>
    }



    return (
        <>
            <Container>
                <GoalsOrgoalsBtns />
                <Row>
                    <Col>
                        {goalsSelected ? <GoalsInputs /> : ''}
                        {console.log(props.chapter)}
                        <CupsCol goalsSelected={goalsSelected} chapter={props.chapter} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PerekTetCupsCol;