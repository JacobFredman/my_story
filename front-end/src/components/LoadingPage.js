import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
// import './helpComponents/modal.css';
import './LoadingPage.css';
import ProgressGradient from './helpComponents/ProgressGradient';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// setInterval(increase, 300);

const LoadingPage = (props) => {
    const [percent, setPercent] = useState(0);
    ////////////////////////////////////////////

    // const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (percent < 100)
                setPercent(percent + 1);
        }, 200);

        return () => {
            clearTimeout(timeout);
        };
    }, [percent]);

    ///////////////////////////////////////////////////

    const increase = () => {
        setPercent(percent + 1);
    }


    // // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     // document.title = `You clicked ${count} times`;
    // }, []);
    // return (counter);

    return (
        // <div className="react-responsive-modal-overlay">
        // <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
        <div>
            <Modal
                // open={props.open}
                open={true}
                onClose={() => props.setOpen(false)}
                center
                classNames={{
                    closeButton: 'closeBtn',
                    overlay: 'loadingPageOverlay',
                    modal: 'loadingPageModal',
                }}
            >
                <Row>
                    <Col>
                        {/* <p style={{ fontFamily: 'Assistant', fontSize: '20px', fontWeight: '600', color: '#C21E7F' }}> מבצע טעינה</p> */}
                        <p className='textloading' > מבצע טעינה</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProgressGradient color='linear-gradient(77deg, #F15F33 0%, #BF1A84 100%)' loadingPage={true} percent={percent} ></ProgressGradient>
                    </Col>
                </Row>
                {/* <div style={{ width: '50%' }}> */}

                {/* </div> */}


                {/* <ProgressGradient /> */}
                {/* <p> ddddddddddddddddddddddddddddddddddddddddddd</p> */}
            </Modal>
        </div>
    );
};

export default LoadingPage;