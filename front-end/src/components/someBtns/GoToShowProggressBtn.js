import React from 'react';
import './QuickFillCupsBtn.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const GoToShowProggressBtn = (props) => {
    return (
        <div className="QuickFillCupsBtn" onClick={() => props.history.push("/")} >
            להתקדמות שלי במסע לחץ כאן
        </div>
    );
};

export default GoToShowProggressBtn;