import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/StaticData';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-responsive-modal';
import moment from 'moment';



class AdminReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersDetails: [],
            chapterNames: [],
            averages: {},
            cupsAndPoints: [],
            workingRow: {}
        };
    };

    componentDidMount() {
        this.getData();
    }


    getData = async () => {
        const response = await axios.post(
            baseUrl + 'admin/get_users_statistics',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' } }
        );
        // let cupsAndPointsView = this.mapToView(response.data.rows)
        this.setState({
            chapterNames: response.data.chapters_details,
            usersDetails: response.data.users_details, averages: response.data.averages
        });
        console.log(response.data.chapters_details);
    }

    getValue = (id, propertyName) => {
        console.log(id);
        let resultObj = this.state.usersDetails.find(obj => {
            return obj.id === id
        })
        console.log(resultObj);
        return resultObj.propertyName;
    }




    mapToView = () => {
        let cap = this.state.usersDetails;
        console.log(this.state.usersDetails);
        return this.state.usersDetails.map((row) => {
            console.log(row);
            return (
                <tr key={row.user_name} >
                    <td>{row.user_name}</td>
                    <td>{row.age}</td>
                    <td>{row.date_of_registering == null ? '' : moment(row.date_of_registering).format('MM/DD/YYYY')}</td>
                    <td>{row.last_update == null ? '' : moment(row.last_update).format('DD/MM/YYYY')}</td>
                    {this.cupsView.call(this, row.cups)}
                    <td>{(row.self_control * 100).toFixed(2) + '%'}</td>
                    <td>{(row.self_connection * 100).toFixed(2) + '%'}</td>
                    <td>{(row.self_commitment * 100).toFixed(2) + '%'}</td>
                    <td>{(row.self_fulfillment * 100).toFixed(2) + '%'}</td>

                    {/* <td>{row.commitment_to_success}</td> */}
                    {/* <td>{row.self_fulfillment}</td> */}
                </tr>
            )
        }
        )
    }


    cupsView = (cups) => {
        return cups.map(val =>
            <td>{val}</td>
        );
    };

    generateChaptersNames = () => {
        console.log(this.state.chapterNames);
        let a = this.state.chapterNames.map(chapter => {
            console.log(chapter);
            return (
                <th
                    key={chapter.chapter_id}
                    style={chapter.automatic_win ? { backgroundColor: '#e6ffe6' } : {}}>
                    {chapter.chapter_name}
                    <p style={{ color: '#20B2AA' }}>{'מקסימום:' + chapter.max_victory_cups}</p>
                </th>
            )
        });
        console.log(a);
        return a;
    }


    averagesView = () => {
        return <tr style={{ backgroundColor: '#ffffcc' }}>
            <td> ממוצע משתמשים</td>
            <td>{this.state.averages['users_age_ave']}</td>
            <td></td>
            <td></td>
            {
                this.state.averages.cupsByChapterAvg !== undefined
                    ?
                    this.state.averages.cupsByChapterAvg.map((avgCups, index) =>
                        <td key={index}> {avgCups}</td>
                    )
                    : ''
            }
            <td>{(this.state.averages.self_control_avg * 100).toFixed(2) + '%'}</td>
            <td>{(this.state.averages.self_connection_avg * 100).toFixed(2) + '%'}</td>
            <td>{(this.state.averages.self_commitment_avg * 100).toFixed(2) + '%'}</td>
            <td>{(this.state.averages.self_fulfillment_avg * 100).toFixed(2) + '%'}</td>


        </tr>
    }







    render() {
        return (
            <Row>
                <Col>
                    <Table dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }} bordered hover>
                        <thead>
                            <tr>
                                {/* <th></th>
                                <th>עד אחוז</th>
                                <th>שליטה עצמית</th>
                                <th>חיבור עצמי</th>
                                <th>מחוייבות להצלחה</th>
                                <th>מימוש עצמי</th> */}
                                <th>שם משתמש</th>
                                <th>גיל</th>
                                <th>תאריך הרשמה</th>
                                <th>תאריך עדכון אחרון</th>
                                {this.generateChaptersNames()}
                                <th>שליטה עצמית</th>
                                <th>חיבור עצמי</th>
                                <th>מחוייבות להצלחה</th>
                                <th>מימוש עצמי</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.averagesView()}
                            {this.mapToView()}
                        </tbody>
                    </Table>
                </Col>
            </Row >
        );
    }
}

export default AdminReport;