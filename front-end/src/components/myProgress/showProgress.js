import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { MdLocalBar } from 'react-icons/md';
import { GrFormClose } from 'react-icons/gr';
import Button from 'react-bootstrap/Button';
import './Cup.css';
import axios from 'axios';
import { baseUrl } from '../../utils/StaticData';


class showProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaptersAndCups: undefined,
            chaptersAndCupsView: undefined
        };
    };

    componentDidMount() {
        this.getData();
    }

    updateCups = async (chapterId, winedCups) => {
        const response = await axios.post(
            baseUrl + 'update_user_cups',
            { "newCups": winedCups, "chapterId": chapterId },
            { headers: { 'Content-Type': 'application/json' } }
        );
        this.getData();
    }

    a = (val, i) => {
        console.log(val);
        console.log(i);
        // console.log(id);
    }



    getData = async () => {
        const response = await axios.post(
            baseUrl + 'get_user_cups',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' } }
        );
        let chaptersAndCupsView = this.mapToView(response.data.rows)
        this.setState({ chaptersAndCups: response.data.rows, chaptersAndCupsView });
        // this.setState({ chaptersAndCups: response.data.rows });
        console.log(this.state.chaptersAndCups);
    }

    mapToView = (chaptersAndCups) => {
        console.log(2);
        return chaptersAndCups.map((chapter, index) => {
            return (
                <tr key={index} style={{ cursor: 'pointer' }}>
                    <td><p>{chapter.chapter_name}</p></td>
                    <td>
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
                    </td>
                </tr>
            )
        })
    }

    buildCups = (chapterId, max, wined_cups) => {
        let result = [<GrFormClose onClick={() => this.updateCups(chapterId, 0)} />];
        var i = 1;
        for (; i <= wined_cups; i++) {
            let a = i
            result.push(<MdLocalBar className='WinedCup' onClick={() => this.updateCups(chapterId, a)} />)
        }
        for (; i <= max; i++) {
            let a = i
            result.push(<MdLocalBar id={a} className='UnWinedCup' onClick={() => this.updateCups(chapterId, a)} />)
        }
        return result;
    }

    render() {
        return (
            < div >
                {console.log(3)}
                <Table dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }} bordered hover>
                    <thead>
                        <tr>
                            <th>שם הפרק</th>
                            {/* <th>זכיה אוטומטית</th> */}
                            <th>מספר גביעים</th>
                            <th>גביעים במספרים</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.chaptersAndCupsView}

                        {/* <tr>
                            <td>מכתב פתיחה</td>
                            <td>
                                <MdLocalBar style={{ color: 'gold', height: '2em', width: '2em' }} onClick={this.a} />
                                <MdLocalBar className='WinedCup' onClick={this.a} />
                                <MdLocalBar className='UnWinedCup' />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} /></td>
                        </tr>
                        <tr>
                            <td>פרק א - סוד האושר</td>
                            <td><MdLocalBar style={{ color: 'gold', height: '2em', width: '2em' }} onClick={this.a} />
                                <MdLocalBar style={{ color: 'gold', height: '2em', width: '2em' }} />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} />
                                <MdLocalBar style={{ color: 'gray', height: '2em', width: '2em' }} /></td>
                        </tr>
                        */}
                        <tr>

                            <td colSpan="3">
                                <Button variant='info'>אני רוצה לראות את המצב שלי בינתיים</Button>
                                <Button>אני רוצה לראות תוצאות סופיות</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>            </div >
        );
    }
}

export default showProgress; 