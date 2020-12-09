import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../helpComponents/proggress.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ProgressGradient = (props) => {
    return (
        <React.Fragment>
            <Row>
                <Col>


                    <div className="circle circle2" style={{}} style={{ background: `${props.color}`, fontFamily: 'Avigul' }}>{props.percent + '%'}</div>
                    <div className="progress progress2">
                        <div className="progress-bar progress-bar2" style={{ width: props.percent + '%', background: `${props.color}` }}>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* <div className="circle1">50%</div> */}



        </React.Fragment>
    );
};

export default ProgressGradient;


