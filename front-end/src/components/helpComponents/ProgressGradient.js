import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../helpComponents/proggress.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const ProgressGradient = (props) => {
    return (
        <React.Fragment>
            <Row>
                <Col >
                    <div className="circle1" style={{ backgroundImage: `${props.backGroundImage}` }}>{props.percent + '%'}</div>
                    <div className="progress1">
                        <div className="progress-bar1" style={{ width: props.percent + '%', backgroundImage: `${props.backGroundImage}` }}>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProgressGradient;


