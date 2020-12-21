import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/StaticData';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FeedbackText.css';






const FeadbackTextArea = (props) => {
    const [feadbackText, setFeadbackText] = useState();
    const [secondaryHeader, setSecondaryHeader] = useState();



    const getFeadbackText = async () => {
        const msg = await axios.post(
            baseUrl + 'get_feadback',
            // { parameterName: 'your_control' },
            { parameterName: props.parameterName },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
        console.log(msg);
        setFeadbackText(msg.data.val[0]);
        setSecondaryHeader(msg.data.secondaryHeader[0]);
        return msg;
    }

    const cleanedFeedbackText = () => {
        return feadbackText.replaceAll("$", " ");
        // return feadbackText.replaceAll("$", "<p></p>");
    }

    useEffect(() => {
        getFeadbackText();
    }, []);


    return (
        < div className="containerText" >
            <Row>
                <Col style={{ color: props.headerColor }} className="Header" md={3}>
                    {secondaryHeader}
                </Col>
                <Col>
                    {feadbackText ? cleanedFeedbackText() : ''}
                </Col>
            </Row>
        </div >
    );
};

export default FeadbackTextArea;