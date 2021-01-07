import React from 'react';
import LittlebotImage from '../../Photos/LittlebotImage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { readCookie } from '../../utils/helper';
import './QuickFillCupsBtn.css';

const ConncetToBotBtn = () => {
    // const readCookie = (name) => {
    //     var nameEQ = name + "=";
    //     var ca = document.cookie.split(';');
    //     for (var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    //         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    //     }
    //     return null;
    // }

    return (
        <a className="LinkInViewOfBtn" href={"https://m.me/MyStory.Book.Bot?ref=refreshToken--" + readCookie('refreshToken')} target="_blank">
            <div className="goalsOrHobitsBtn notActiveBtn" style={{ width: '120px', display: 'inline-flex', marginLeft: '20px' }}>
                <p style={{ fontSize: '15px', lineHeight: '30px', marginRight: '5px', marginLeft: '10px', marginBottom: '0' }}>
                    התחבר לבוט
                    </p>
                {/* <p style={{ fontSize: '15px', lineHeight: '30px', marginRight: '5px', marginLeft: '10px', marginBottom: '0' }}>התחבר לבוט</p> */}

                <LittlebotImage style={{ display: 'inline-block' }} />
            </div>
        </a>
    );
};

export default ConncetToBotBtn;