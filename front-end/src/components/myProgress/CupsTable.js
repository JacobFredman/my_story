import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import TableCupsHeader from './TableCupsHeader';
import TableCupsBottom from './TableCupsBottom';
import TableCupsRows from './TableCupsRows';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../../utils/StaticData';
import axios from 'axios';
import { getChaptersAndCups } from './UpdateCups';







const CupsTable = () => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const dispatch = useDispatch();

    const getData = async () => {
        // await getGoalsOrHabits();
        const rowsData = await getChaptersAndCups();
        dispatch({ type: 'CHAPTERSANDCUPS', val: rowsData.data.rows });
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
            {/* <tbody>{chaptersAndCups !== undefined ? <TableCupsRows /> : null}<TableCupsBottom /> */}
            <tbody>
                {chaptersAndCups ? <TableCupsRows /> : null}
                <TableCupsBottom />
            </tbody>
        </Table>
    );
};

export default CupsTable;