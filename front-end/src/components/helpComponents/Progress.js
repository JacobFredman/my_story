import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../helpComponents/proggress.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';


const Proggress = (props) => {
    const spinnerOrPercent = () => {
        if (props.percent)
            return parseInt(props.percent * 100) + '%';
        return <Spinner />
    }
    return (

        <React.Fragment>
            <Row>
                <Col >
                    <div className="circle circle1" style={{ backgroundColor: `${props.color}` }}>
                        {props.percent ? parseInt(props.percent * 100) + '%' : <Spinner animation="border" size="sm" />}
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


