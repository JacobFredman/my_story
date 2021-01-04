import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../helpComponents/proggress.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';


const Proggress = (props) => {

    return (

        <React.Fragment>
            <Row>
                <Col >
                    <div className="circle circle1" style={{ backgroundColor: `${props.color}`, fontFamily: 'Avigul' }}>
                        {props.percent === undefined ? <Spinner animation="border" size="sm" /> : parseInt(props.percent * 100) + '%'}
                    </div>
                    <div className="progress progress1">
                        <div className="progress-bar progress-bar1" style={{ width: parseInt(props.percent * 100) + '%', backgroundColor: `${props.color}` }}>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Proggress;


