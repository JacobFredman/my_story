import React from 'react';
import Progress from './Progress';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressGradient from './ProgressGradient';


const Example = () => {
    return (
        <React.Fragment>
            {/* <Row>

                <Col>
                    <ProgressGradient backGroundImage="linear-gradient(to right, #ffad33, #e60073)" percent='100' ></ProgressGradient>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row> */}
            <Row>
                <Col xs={7}>
                    <Progress color='#0088CE' percent='50' ></Progress>
                </Col>
                <Col ><h4 style={{ color: '#000000', textAlign: 'left' }}>שליטה עצמית</h4></Col>
            </Row>
            <Row>
                <Col xs={7}>
                    <Progress color='#48C2C5' percent='30' ></Progress>
                </Col>
                <Col><h4 style={{ color: '#000000', textAlign: 'left' }}>חיבור לעצמי</h4></Col>
            </Row>
            <Row>

                <Col xs={7}>
                    <Progress color='#F27652' percent='70' ></Progress>
                </Col>
                <Col><h4 style={{ color: '#000000', textAlign: 'left' }}>מימוש עצמי</h4></Col>
            </Row>
            <Row>
                <Col xs={7}>
                    <Progress color='#AB3C96' percent='70' ></Progress>
                </Col>
                <Col ><h4 style={{ color: '#000000', textAlign: 'left' }}>מחוייבות להצלחה</h4></Col>
            </Row>

        </React.Fragment>
    );
};

export default Example;