// import { React, Component, useRef } from 'react';
import React from 'react';
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
// import Container from 'react-bootstrap/Container';
// import 'react-responsive-modal/styles.css';
// import Form from 'react-bootstrap/Form';
import NavBarDesigned from '../NavBarDesigned';
// import Background from '../../Photos/backGroundWhatsApp1.svg';
// import Cup from '../helpComponents/Cup';
import './ShowProgress.css';
// import AllRotatedPartsNames from '../helpComponents/AllRotatedPartsNames';
// import ButtonFiddbackText from '../helpComponents/ButtonFiddbackText';
// import BackGroundLeftRoad from '../../Photos/BackGroundLeftRoad.svg';
import CupsTable from './CupsTable';
import { useSelector, useDispatch } from 'react-redux';


const ShowProgress2 = () => {
    const chaptersAndCups = useSelector(state => state);
    const dispathc = useDispatch();
    // dispathc({ type: "CHAPTERSANDCUPS" });

    console.log(chaptersAndCups);
    return (
        // <React.Fragment>
        <div>
            <Row className="backStyle">
                <Col>
                    <UpLine />
                    <NavBarDesigned></NavBarDesigned>

                    <Row>
                        <Col></Col>
                        <Col xs={10} md={7} style={{ paddingRight: '0' }}>
                            <CupsTable />
                        </Col>
                        {/* <Col xs={1} style={{ paddingLeft: '0', paddingRight: '0' }}>
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
                        </Col> */}
                        <Col></Col>
                    </Row>

                    <UpLine />
                    <div />
                </Col>
            </Row>
        </div>
    );
};

export default ShowProgress2;