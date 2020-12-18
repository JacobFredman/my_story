import React, { useState, useEffect } from 'react';
import Progress from './Progress';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressGradient from './ProgressGradient';
import { baseUrl } from '../../utils/StaticData';
import axios from 'axios';
import "./ProgressesBars.css";
import "../myProgress/tooltip.css";
import ReactTooltip from 'react-tooltip';


const ProgressesBars = () => {
    const [my_your_control, set_my_your_control] = useState();
    const [my_connection_to_yourself, set_my_connection_to_yourself] = useState();
    const [my_commitment_to_success, set_my_commitment_to_success] = useState();
    const [my_self_fulfillment, set_my_self_fulfillment] = useState();


    const runGetData = async () => {
        getData('get_user_control', 'my_your_control');
        getData('get_user_connection_to_yourself', 'my_connection_to_yourself');
        getData('get_user_commitment_to_success', 'my_commitment_to_success');
        getData('get_user_self_fulfillment', 'my_self_fulfillment');
    }


    const getData = async (url, stateToUpdate) => {
        const response = await axios.post(
            baseUrl + url,
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );


        if (stateToUpdate === 'my_your_control')
            set_my_your_control(response.data.val);
        if (stateToUpdate === 'my_connection_to_yourself')
            set_my_connection_to_yourself(response.data.val);
        if (stateToUpdate === 'my_commitment_to_success')
            set_my_commitment_to_success(response.data.val);
        if (stateToUpdate === 'my_self_fulfillment')
            set_my_self_fulfillment(response.data.val);
    }



    useEffect(() => {
        runGetData();
    }, []);





    return (
        <React.Fragment>
            <Row>
                <Col xs={7}>
                    <Progress color='#0088CE' percent={my_your_control} ></Progress>
                </Col>
                <Col ><h4
                    data-tip="היכולת שלך לנהל את חייך כרצונך בלי להיסחף אחרי הסחות ומסכים"
                    className="textProsess" style={{ color: '#000000', textAlign: 'left' }}>שליטה עצמית</h4></Col>
            </Row>
            <Row>
                <Col xs={7}>
                    <Progress color='#48C2C5' percent={my_connection_to_yourself} ></Progress>
                </Col>
                <Col><h4
                    data-tip="היכולת שלך להיות נאמן לעולם הפנימי שלך וקשוב אליו"
                    className="textProsess" style={{ color: '#000000', textAlign: 'left' }}>חיבור לעצמי</h4></Col>
            </Row>
            <Row>
                <ReactTooltip backgroundColor="#FFFFFF" textColor="#000000" />
                <Col xs={7}>
                    <Progress color='#F27652' percent={my_self_fulfillment} ></Progress>
                </Col>
                <Col><h4
                    data-tip="היכולת שלך להתקדם בהתמדה וללא ויתורים אל היעדים שלך"
                    className="textProsess" style={{ color: '#000000', textAlign: 'left' }}>מימוש עצמי</h4></Col>
            </Row>
            <Row>
                <Col xs={7}>
                    <Progress color='#AB3C96' percent={my_commitment_to_success} ></Progress>
                </Col>
                <Col ><h4
                    data-tip="היכולת שלך להוציא אל הפועל את כל האיכויות והכישרונות הגלומים בך"
                    className="textProsess" style={{ color: '#000000', textAlign: 'left' }}>מחוייבות להצלחה</h4></Col>
            </Row>

        </React.Fragment>
    );
};

export default ProgressesBars;