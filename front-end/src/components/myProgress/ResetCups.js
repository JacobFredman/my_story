import React from 'react';
import { resetUserCups, getChaptersAndCups } from './UpdateCups';
import { useSelector, useDispatch } from 'react-redux';


const ResetCups = () => {
    const dispatch = useDispatch();

    const resetAll = async () => {
        const msg = await resetUserCups();
        await getData();
    }

    const getData = async () => {
        // await getGoalsOrHabits();
        const rowsData = await getChaptersAndCups();
        dispatch({ type: 'CHAPTERSANDCUPS', val: rowsData.data.rows });
    }



    return (
        <div>
            <p onClick={resetAll} style={{ font: 'normal normal 600 16px/13px Assistant', color: '#AB3C96', position: 'absolute', top: '20%', cursor: 'pointer' }}>אפס מסע</p>
        </div>
    );
};

export default ResetCups;