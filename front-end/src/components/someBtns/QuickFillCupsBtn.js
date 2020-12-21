import React from 'react';
import './QuickFillCupsBtn.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const QuickFillCupsBtn = (props) => {
    return (
        <div className="QuickFillCupsBtn" onClick={() => props.history.push("/quick_fill_cups")} >
            למילוי מהיר של הגביעים לחץ כאן
        </div>
    );
};

export default QuickFillCupsBtn;