import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
// import './helpComponents/modal.css';
import './LoadingPage.css';
import ProgressGradient from './helpComponents/ProgressGradient';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const LoadingPage = (props) => {
    const [percent, setPercent] = useState(0);


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (percent < 100)
                setPercent(percent + 1);
        }, 200);

        return () => {
            clearTimeout(timeout);
        };
    }, [percent]);


    const increase = () => {
        setPercent(percent + 1);
    }


    return (
        <div>
            <Modal
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
                        <p className='textloading' > מבצע טעינה</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProgressGradient color='linear-gradient(77deg, #F15F33 0%, #BF1A84 100%)' loadingPage={true} percent={percent} ></ProgressGradient>
                    </Col>
                </Row>



            </Modal>
        </div>
    );
};

export default LoadingPage;