import React, { useState } from 'react';
import './PerekTetCupsCol.css';
import CupsCol from '../CupsCol';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RotatedPartName from '../../helpComponents/RotatedPartName';
import { is } from 'immutable';
import { updateCupsServer } from '../UpdateCups';

const maxgoals = 30;
let autoFocusOn;

const PerekTetCupsCol = (props) => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    // const perekTet = chaptersAndCups.find(chapter => chapter.id === 11);

    const [achivedgoals, setAchivedgoals] = useState();
    const [goalesNum, setgoalesNum] = useState();

    const [goalsSelected, setgoalsSelected] = useState(false);
    const [victory_cups_wined, setvictory_cups_wined] = useState(1);

    console.log(props);

    const updategoalsOrHobits = isGoalsSelected => {
        setgoalsSelected(isGoalsSelected);
    }

    // const Updateachivedgoals = (achivedgoalsParam) => {
    //     if (achivedgoalsParam > maxgoals || achivedgoals > goalesNum)
    //         setAchivedgoals(Math.min(maxgoals, goalesNum));
    //     else
    //         setAchivedgoals(achivedgoalsParam);

    //     updateCups();
    // }

    const updateCups = () => {
        console.log('achivedgoals: ' + achivedgoals);
        console.log('goalesNum: ' + goalesNum);
        console.log(props.chapter.max_victory_cups);
        const cupsNum = parseInt((achivedgoals / goalesNum) * props.chapter.max_victory_cups);
        console.log('result :' + cupsNum);
        setvictory_cups_wined(cupsNum);
    }


    const ongoalesNumInputChange = (e) => {
        e.preventDefault();
        const val = e.target.value;
        autoFocusOn = "goalesNumInput";
        if (val > maxgoals)
            setgoalesNum(maxgoals);
        if (val < achivedgoals)
            setgoalesNum(achivedgoals);
        else
            setgoalesNum(val);
        updateCups();
    }

    const onAchivedgoalsInputChange = (e) => {
        e.preventDefault();
        const val = e.target.value;
        console.log(val);
        autoFocusOn = "achivedgoalsInput";
        if (val > goalesNum)
            setAchivedgoals(goalesNum);
        if (val < 0)
            setAchivedgoals(0)
        else
            setAchivedgoals(val);
        updateCups();
    }




    const GoalsOrgoalsBtns = () => {
        return <Row>
            <Col className="goalsOrHobitsBtnsContainer">
                <div onClick={() => updategoalsOrHobits(true)} className={goalsSelected ? "goalsOrHobitsBtn activeBtn" : "notActiveBtn goalsOrHobitsBtn"}>יעדים</div>
                <div onClick={() => updategoalsOrHobits(false)} className={goalsSelected ? "notActiveBtn goalsOrHobitsBtn" : "goalsOrHobitsBtn activeBtn"}>הרגלים</div>
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
            <input key="goalesNumInput" max={10} type="number"
                // type="text" autoFocus={() => autoFocusOn === "goalesNumInput"} className="goalsOrgoalsInput" placeholder="הקלד יעדים שהגדרת"></input>
                type="text" className="goalsOrHobitsInput" placeholder="הקלד יעדים שהגדרת"></input>

            {/* <input autoFocus={autoFocusOn === "achivedgoalsInput"} key="achivedgoalsInput" value={achivedgoals} onChange={e => onAchivedgoalsInputChange(e)} onChange={e => Updateachivedgoals(e.target.value)} */}
            <input autoFocus={autoFocusOn === "achivedgoalsInput"} key="achivedgoalsInput" value={achivedgoals} onChange={e => onAchivedgoalsInputChange(e)}
                // type="text" autoFocus={() => autoFocusOn === "achivedgoalsInput"} className="goalsOrgoalsInput" placeholder="הקלד יעדים שהשגת"></input>
                type="text" className="goalsOrHobitsInput" placeholder="הקלד יעדים שהשגת"></input>
        </div>
    }



    return (
        <>
            <Container>
                <GoalsOrgoalsBtns />
                <Row>
                    <Col>
                        {goalsSelected ? <GoalsInputs /> : ''}
                        {!goalsSelected
                            ?
                            <CupsCol goalsSelected={goalsSelected} chapter={props.chapter} />
                            :
                            <CupsCol goalsSelected={goalsSelected}
                                chapter={{ ...props.chapter, victory_cups_wined }} />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PerekTetCupsCol;