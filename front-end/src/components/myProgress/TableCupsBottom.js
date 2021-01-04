import React, { useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ButtonFiddbackText from '../helpComponents/ButtonFiddbackText';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserCups, getChaptersAndCups } from './UpdateCups';
import { useHistory } from "react-router";
import Button from 'react-bootstrap/Button';
import ResetCups from './ResetCups';
import GoToShowProggressBtn from '../someBtns/GoToShowProggressBtn';



const TableCupsBottom = (props) => {
    const refEndLastPart = useSelector(state => state.refEndLastPart);
    const dispatch = useDispatch();
    const myRef = useRef();
    let history = useHistory()


    useEffect(() => {
        dispatch({ type: 'RefEndLastPart', myRef });
        console.log(myRef);
    }, []);

    const resetAll = async () => {
        const msg = await resetUserCups();
        await getData();
    }

    const getData = async () => {
        // await getGoalsOrHabits();
        const rowsData = await getChaptersAndCups();
        dispatch({ type: 'CHAPTERSANDCUPS', val: rowsData.data.rows });
    }

    // const divPointer = <div ref={ele => (dispatch({ type: 'RefEndLastPart', ele }))} id={'end'} style={{ height: '1px', width: '10px', backgroundColor: 'blue' }}></div>; 

    return (
        <tr >
            <td colSpan="4">
                <Container>
                    <Row style={{ direction: 'rtl' }} className="justify-content-center" >
                        <div ref={myRef} id={'end'} style={{ height: '1px', width: '1px', backgroundColor: 'blue' }} />
                        <Col xs={10}>
                            <div onClick={() => props.history.push("/?showFiddbackText=true")} style={{ marginBottom: '20px', marginTop: '20px' }}>
                                <ButtonFiddbackText onClick={() => props.history.push("/?showFiddbackText=true")} />
                            </div>
                        </Col>
                        {/* <Col><p onClick={resetAll} style={{ font: 'normal normal 600 16px/13px Assistant', color: '#AB3C96', position: 'absolute', top: '20%', cursor: 'pointer' }}>אפס מסע</p></Col> */}
                    </Row>
                    {/* <Row className="justify-content-md-center"> */}
                    <Row className="justify-content-md-center">
                        <Col></Col>
                        <Col xs={8}>
                            {/* <div onClick={() => history.push("/")}>לדף הראשי</div> */}
                            {/* <Button onClick={() => history.push("/")}>לדף הראשי</Button> */}
                            <GoToShowProggressBtn history={props.history} />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col></Col>
                        <Col xs='auto' style={{ marginTop: "20px" }}><ResetCups /></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </td>
        </tr>
    );
};

export default TableCupsBottom;