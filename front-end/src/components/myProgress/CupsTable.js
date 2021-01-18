import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import TableCupsHeader from './TableCupsHeader';
import TableCupsBottom from './TableCupsBottom';
import TableCupsRows from './TableCupsRows';
import { useSelector, useDispatch } from 'react-redux';
import { getChaptersAndCups } from './UpdateCups';
import LoadingPage from '../LoadingPage';
import { message } from 'antd';







const CupsTable = (props) => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const dispatch = useDispatch();

    const getData = async () => {
        // await getGoalsOrHabits();
        const rowsData = await getChaptersAndCups();
        dispatch({ type: 'CHAPTERSANDCUPS', val: rowsData.data.rows });
        message.info('אם קראת פרק- פשוט הקלק עליו', 5);
    }


    useEffect(() => {
        getData();
        console.log(props.history)
    }, []);




    return (
        < Table size="sm" dir='rtl' style={{ direction: 'rtl', textAlign: 'right', background: '#FFFFFF', boxShadow: '0px 0px 20px #00000029', marginTop: '30px' }
        } >
            <TableCupsHeader />
            {/* <tbody>{chaptersAndCups !== undefined ? <TableCupsRows /> : null}<TableCupsBottom /> */}
            <tbody>
                {chaptersAndCups ? <TableCupsRows /> : <LoadingPage />}
                <TableCupsBottom history={props.history} />
            </tbody>
        </Table >
    );
};

export default CupsTable;