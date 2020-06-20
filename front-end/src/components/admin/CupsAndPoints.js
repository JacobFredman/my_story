import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/StaticData';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class CupsAndPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cupsAndPoints: []
            // cupsAndPointsView: []
        };
    };

    componentDidMount() {
        this.getData();
    }


    getData = async () => {
        const response = await axios.post(
            baseUrl + 'admin/cups_and_points',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' } }
        );
        // let cupsAndPointsView = this.mapToView(response.data.rows)
        this.setState({ cupsAndPoints: response.data.rows });
        console.log(response.data.rows);
    }

    getValue = (id, propertyName) => {
        console.log(id);
        let resultObj = this.state.cupsAndPoints.find(obj => {
            return obj.id === id
        })
        console.log(resultObj);
        return resultObj.propertyName;
    }

    updateValue = (id, property, value) => {
        const objIndex = this.state.cupsAndPoints.findIndex((obj => obj.id == id));
        this.state.cupsAndPoints[objIndex][property] = value;
        this.forceUpdate();
    }


    mapToView = () => {
        let cap = this.state.cupsAndPoints;
        console.log(this.state.cupsAndPoints);
        return this.state.cupsAndPoints.map((chapter) => {
            return (
                <tr key={chapter.id} >
                    <td><input type="text" value={() => this.getValue(chapter.id, 'chapter_name')} name="name" /></td>
                    <td><input type="number" value={cap.commitment_to_success} name="name" /></td>
                    <td><input type="number" value={cap.connection_to_yourself} name="name" /></td>
                    <td><input type="number" value={cap.chapter_name} name="name" /></td>
                    <td><input type="number" value={cap.chapter_name} name="name" /></td>
                    {/* <td><input value={this.state.chapter.chapter_name} /></td> */}
                    <td> <input type="text" name="name" /></td>
                    {/* <td><input value="kjkjjkj" /></td> */}
                    {/* <td>
                        {this.buildCups.call(this, chapter.id, chapter.max_victory_cups, chapter.wined_cups)}
                    </td>
                    <td>
                        <p>{chapter.wined_cups + '/' + chapter.max_victory_cups}
                            {
                                chapter.automatic_win
                                    ? <p style={{ color: '#2eb82e' }}>זכיה אוטומטית</p>
                                    : ''
                            }
                        </p>
                    </td> */}
                </tr>
            )
        }
        )
    }





    render() {
        return (
            <div>
                <Table dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }} bordered hover>
                    <thead>
                        <tr>
                            <th>שם הפרק</th>
                            <th>מספר גביעים מקסימלי</th>
                            <th>זכיה אוטמטית</th>
                            <th>שליטה עצמית</th>
                            <th>חיבור עצמי</th>
                            <th>מחוייבות להצלחה</th>
                            <th>מימוש עצמי</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.mapToView()}
                        <tr>
                            <td colSpan="3">
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div >
        );
    }
}

export default CupsAndPoints;