// import { React, Component, useRef } from 'react';
import React, { useEffect } from 'react';
import UpLine from '../helpComponents/UpLine';

// import Table from 'react-bootstrap/Table';
// import { MdLocalBar } from 'react-icons/md';
// import { GrFormClose } from 'react-icons/gr';
// import Button from 'react-bootstrap/Button';
import './Cup.css';
// import axios from 'axios';
// import { baseUrl } from '../../utils/StaticData';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Modal from 'react-responsive-modal';
import Container from 'react-bootstrap/Container';
// import 'react-responsive-modal/styles.css';
// import Form from 'react-bootstrap/Form';
import NavBarDesigned from '../NavBarDesigned';
// import Background from '../../Photos/backGroundWhatsApp1.svg';
// import Cup from '../helpComponents/Cup';
import './ShowProgress.css';
import AllRotatedPartsNames from '../helpComponents/AllRotatedPartsNames';
// import ButtonFiddbackText from '../helpComponents/ButtonFiddbackText';
// import BackGroundLeftRoad from '../../Photos/BackGroundLeftRoad.svg';
import CupsTable from './CupsTable';
import { useSelector, useDispatch } from 'react-redux';
import { is_user } from '../myProgress/UpdateCups';



const ShowProgress2 = (props) => {
    const refsToBeginOfParts = useSelector(state => state.refsToBeginOfParts);
    const reRenderComponent = useSelector(state => state.updateGoalsOrHabitChanged);

    const dispatch = useDispatch();
    // const chaptersAndCups = useSelector(state => state.chaptersAndCups);


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

    useEffect(() => {
        cleanDivsPointers();
        goToLogInIfNotUser();
    }, [reRenderComponent]);

    const cleanDivsPointers = () => {
        dispatch({ type: 'CLEANREFSTOBEGINOFPARTS' })
    }

    return (
        <>
            <Row className="backStyle">
                <Col>
                    <UpLine />
                    <NavBarDesigned></NavBarDesigned>


                    <Row className="justify-content-md-center">
                        <Col xs={12} md={7} style={{ paddingRight: '0', paddingLeft: '0' }}>
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col style={{ paddingRight: '0', paddingLeft: '0' }}>
                                        <CupsTable />
                                    </Col>
                                    <Col xs={1} style={{ padding: '0', marging: '0' }}>
                                        {refsToBeginOfParts && refsToBeginOfParts[1] !== undefined ? <AllRotatedPartsNames /> : ''}

                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>


                </Col>
            </Row>
        </>
    );



};

export default ShowProgress2;