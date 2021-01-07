import React from 'react';
import LittlebotImage from '../../Photos/LittlebotImage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { readCookie } from '../../utils/helper';
import './QuickFillCupsBtn.css';

const ConncetToBotBtn = () => {

    return (
        <a className="LinkInViewOfBtn" href={"https://m.me/MyStory.Book.Bot?ref=refreshToken--" + readCookie('refreshToken')} target="_blank">
            <div className="goalsOrHobitsBtn notActiveBtn" style={{ width: '120px', display: 'inline-flex', marginLeft: '20px' }}>
                <p style={{ fontSize: '15px', lineHeight: '30px', marginRight: '5px', marginLeft: '10px', marginBottom: '0' }}>
                    התחבר לבוט
                    </p>

                <LittlebotImage style={{ display: 'inline-block' }} />
            </div>
        </a>
    );
};

export default ConncetToBotBtn;