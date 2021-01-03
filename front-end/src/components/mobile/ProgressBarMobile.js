import React from 'react';
import Progress from '../helpComponents/Progress';
import '../helpComponents/ProgressesBars.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProgressBarMobile = () => {
    return (

        <div style={{ width: '200px', direction: 'ltr', textAlign: 'center' }}>
            <h5 style={{ color: '#F15F33', fontFamily: 'Avigul', fontWeight: 'bold', padding: '10px 0px 5px 5px' }}>ההתקדמות במסע</h5>
            <Progress color='#F15F33' percent='0.45' />
        </div>
    );
};

export default ProgressBarMobile;