import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import TableCupsHeader from './TableCupsHeader';
import TableCupsBottom from './TableCupsBottom';
import TableCupsRows from './TableCupsRows';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../../utils/StaticData';
import axios from 'axios';






const CupsTable = () => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const dispatch = useDispatch();

    const getData = async () => {
        // await getGoalsOrHabits();
        await getChaptersAndCups();
    }

    const getChaptersAndCups = async () => {
        const response = await axios.post(
            baseUrl + 'get_user_cups',
            { "a": "a" },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            // { headers: { 'Content-Type': 'application/json' } }
        );
        // this.setState({ chaptersAndCups: response.data.rows });
        // dispatch({ type: 'CHAPTERSANDCUPS', chaptersAndCups: response.data.rows });
        dispatch({ type: 'CHAPTERSANDCUPS', val: response.data.rows });
        // this.props.OnGetChaptersAndCups({ chaptersAndCups: response.data.rows });
        // this.props.OnGetChaptersAndCups({ chaptersAndCups: 'aaaaaaaaaaaaaaa' }, () => console.log(this.props.chaptersAndCups + '2121'));
        console.log(chaptersAndCups);
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        console.log(chaptersAndCups);
    })

    return (
        <Table size="sm" dir='rtl' style={{ direction: 'rtl', textAlign: 'right', background: '#FFFFFF', boxShadow: '0px 0px 20px #00000029', marginTop: '30px' }} >
            <TableCupsHeader />
            <tbody>
                {chaptersAndCups !== undefined ? <TableCupsRows /> : ''}
                <TableCupsBottom />
            </tbody>
        </Table>
    );
};

export default CupsTable;