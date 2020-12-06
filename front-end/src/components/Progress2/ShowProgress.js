import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBarDesigned from '../NavBarDesigned';
import Example from '../../components/helpComponents/Example';
import CupsAccumulation from '../helpComponents/CupsAccumulation';
import Container from 'react-bootstrap/Container';
import { IoIosPin } from "react-icons/io";


const ShowProgress = () => {
    return (

        <React.Fragment>
            <Row>
                <Col>
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
                    <Row >
                        <Col xs="auto" md={7} style={{ backgroundColor: '#E4E2F230' }}>
                            <Example>
                            </Example>
                        </Col>
                        <Col xs="auto" md={5} style={{ backgroundColor: '#E4E2F2C2', textAlign: 'center' }}>
                            <Row>
                                <Col></Col>
                                <Col xs="auto">
                                    <Row>
                                        <Col>
                                            <div style={{ height: '150px', width: '150px', border: '1px solid' }}>

                                            </div>
                                        </Col>
                                        <Col xs="auto">
                                            <IoIosPin size="5em" style={{ color: '#C68E30' }}></IoIosPin>
                                            <h4 style={{ color: '#C68E30' }}>אתה נמצא</h4>
                                            <h4 style={{ color: '#C68E30' }}>בחלק 2</h4>
                                            <h4 style={{ color: '#C68E30' }}>פרק ג</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <CupsAccumulation></CupsAccumulation>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Col>
                        {/* <Col>1 of 3</Col>
                        <Col md="auto">Variable width content</Col>
                        <Col >
                            3 of 3
    </Col> */}
                    </Row>
                </Col>
            </Row>
        </React.Fragment >
    );
};

export default ShowProgress;