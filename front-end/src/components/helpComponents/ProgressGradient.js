import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../helpComponents/proggress.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';



const ProgressGradient = (props) => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const percentOfReaded = () => {
        if (chaptersAndCups) {
            const NumOfReaded = chaptersAndCups.filter(chapter => chapter.is_readed).length;
            return parseInt((NumOfReaded / chaptersAndCups.length) * 100, 10);
        }
        return 0;
        // return chaptersAndCups.filter(chapter => chapter.is_readed).length / chaptersAndCups.length;
    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    {/* <div className="circle circle2" style={{}} style={{ background: `${props.color}`, fontFamily: 'Avigul' }}>{props.percent + '%'}</div> */}
                    <div className="circle circle2" style={{}} style={{ background: `${props.color}`, fontFamily: 'Avigul' }}>{percentOfReaded() + '%'}</div>
                    <div className="progress progress2">
                        {/* <div className="progress-bar progress-bar2" style={{ width: props.percent + '%', background: `${props.color}` }}> */}
                        <div className="progress-bar progress-bar2" style={{ width: percentOfReaded() + '%', background: `${props.color}` }}>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* <div className="circle1">50%</div> */}



        </React.Fragment>
    );
};

export default ProgressGradient;


