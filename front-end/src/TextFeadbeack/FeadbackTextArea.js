import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/StaticData';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FeedbackText.css';
import LoadingPage from '../components/LoadingPage';
import Icon1 from '../Photos/feadbackTextIcons/Icon1';
import Icon2 from '../Photos/feadbackTextIcons/Icon2';
import Icon3 from '../Photos/feadbackTextIcons/Icon3';
import Icon4 from '../Photos/feadbackTextIcons/Icon4';






const FeadbackTextArea = (props) => {
    const [feadbackText, setFeadbackText] = useState();
    const [secondaryHeader, setSecondaryHeader] = useState();
    const [mainHeader, setMainHeader] = useState();



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
        setMainHeader(msg.data.mainHeader[0])
        return msg;
    }

    const cleanedFeedbackText = () => {
        const sentenses = feadbackText.split("$");
        const paragrphs = sentenses.map(sentes => <p> {sentes} </p>);
        // return feadbackText.replaceAll("$", " ");
        return <div> {paragrphs}</div>
    }

    const GetIcon = () => {
        // return (<> <Icon4 /> <Icon2 /><Icon1 /><Icon3 /> </>)
        if (props.parameterName == "your_control")
            return <Icon4 />
        if (props.parameterName == "connection_to_yourself")
            return <Icon2 />
        if (props.parameterName == "commitment_to_success")
            return <Icon1 />
        if (props.parameterName == "self_fulfillment")
            return <Icon3 />
    }

    useEffect(() => {
        getFeadbackText();
    }, []);


    return (
        < div className="containerText" >
            {feadbackText
                ?
                <Row>
                    <Col style={{ color: props.headerColor }} md={3}>
                        <p className="HeaderFeadback"> {mainHeader} </p>
                        <p className="secondryHeaderFeadback"> {secondaryHeader} </p>
                    </Col>
                    <Col xs='auto'>
                        <GetIcon />
                    </Col>
                    <Col>
                        {feadbackText ? cleanedFeedbackText() : ''}
                    </Col>
                </Row>
                :
                <LoadingPage />
            }
        </div >
    );
};

export default FeadbackTextArea;