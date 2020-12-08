import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../helpComponents/proggress.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const Proggress = (props) => {
    return (
        // <ProgressBar now="40"></ProgressBar>
        <React.Fragment>

            <Row>
                <Col >
                    {/* <div className="circle1">50%</div> */}
                    <div className="circle circle1" style={{ backgroundColor: `${props.color}` }}>{props.percent + '%'}</div>
                    <div className="progress progress1">
                        {/* <div className="progress-bar1" style={{ width: '40%', backgroundColor: '#8B008B' }}> */}
                        <div className="progress-bar progress-bar1" style={{ width: props.percent + '%', backgroundColor: `${props.color}` }}>
                        </div>
                    </div>
                </Col>
                {/* <Col></Col> */}
            </Row>
        </React.Fragment>
    );
};

export default Proggress;


