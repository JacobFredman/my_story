import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/StaticData';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    }

    getValue = (id, propertyName) => {
        let resultObj = this.state.usersDetails.find(obj => {
            return obj.id === id
        })
        return resultObj.propertyName;
    }




    mapToView = () => {
        return this.state.usersDetails.map((row, index) => {
            return (
                <tr key={row.user_name} >
                    <td>{index + 1}</td>
                    <td>{row.user_name}</td>
                    <td>{row.age}</td>
                    {/* <td>{row.date_of_registering == null ? <p>hhhh</p> : moment(row.date_of_registering).format('MM/DD/YYYY')}</td> */}
                    <td>{row.date_of_registering == null ? null : moment(row.date_of_registering).format('MM/DD/YYYY')}</td>
                    {/* <td>{row.last_update == null ? <p>hhhh</p> : moment(row.last_update).format('DD/MM/YYYY')}</td> */}
                    <td>{row.last_update == null ? null : moment(row.last_update).format('DD/MM/YYYY')}</td>
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
        return cups.map((val, index) =>
            <td key={index}>{val}</td>
        );
    };

    generateChaptersNames = () => {
        let a = this.state.chapterNames.map(chapter => {
            return (
                <th
                    key={chapter.chapter_id}
                    style={chapter.automatic_win ? { backgroundColor: '#e6ffe6' } : {}}>
                    {chapter.chapter_name}
                    <p style={{ color: '#20B2AA' }}>{'מקסימום:' + chapter.max_victory_cups}</p>
                </th>
            )
        });
        return a;
    }


    averagesView = () => {
        return (<tr style={{ backgroundColor: '#ffffcc' }}>
            <td></td>
            <td>ממוצע משתמשים</td>
            <td>{this.state.averages['users_age_ave']}</td>
            <td></td>
            <td></td>
            {this.state.averages.cupsByChapterAvg !== undefined ? this.state.averages.cupsByChapterAvg.map((avgCups, index) => <td key={index}>{avgCups}</td>) : null}
            <td>{(this.state.averages.self_control_avg * 100).toFixed(2) + '%'}</td>
            <td>{(this.state.averages.self_connection_avg * 100).toFixed(2) + '%'}</td>
            <td>{(this.state.averages.self_commitment_avg * 100).toFixed(2) + '%'}</td>
            <td>{(this.state.averages.self_fulfillment_avg * 100).toFixed(2) + '%'}</td>
        </tr>)
    }







    render() {
        return (
            <Row>
                <Col>
                    <Table dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }} bordered hover>
                        <thead>
                            <tr>
                                <th></th>
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
                        <tbody>{this.averagesView()}{this.mapToView()}</tbody>
                    </Table>
                </Col>
            </Row >
        );
    }
}

export default AdminReport;