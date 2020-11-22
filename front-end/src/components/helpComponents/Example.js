import React from 'react';
import Progress from './Progress';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressGradient from './ProgressGradient';


const Example = () => {
    return (
        <React.Fragment>
            <Row>

                <Col>
                    <ProgressGradient backGroundImage="linear-gradient(to right, #ffad33, #e60073)" percent='100' ></ProgressGradient>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Progress color='#3385ff' percent='50' ></Progress>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>

                <Col>
                    <Progress color='#80ffd4' percent='30' ></Progress>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>

                <Col>
                    <Progress color='#ff8c1a' percent='70' ></Progress>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Progress color='#cc0066' percent='70' ></Progress>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>

        </React.Fragment>
    );
};

export default Example;