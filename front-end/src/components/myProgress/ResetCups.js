import React, { useState } from 'react';
import { resetUserCups, getChaptersAndCups } from './UpdateCups';
import { useSelector, useDispatch } from 'react-redux';
import Example2 from '../helpComponents/Example2';
import LoadingPage from '../LoadingPage';


const ResetCups = () => {
    const [showResetMsg, setShowResetMsg] = useState();
    const [showLoadingPage, setShowLoadingPage] = useState(false);


    const resetAll = async () => {
        setShowLoadingPage(true);
        const msg = await resetUserCups();
        window.location.reload();
        // setShowLoadingPage(false);
        // await getData();
    }

    // const getData = async () => {
    //     // await getGoalsOrHabits();
    //     const rowsData = await getChaptersAndCups();
    //     dispatch({ type: 'CHAPTERSANDCUPS', val: rowsData.data.rows });
    // }



    return (
        <span>

            {/* <p onClick={() => setShowResetMsg(true)} style={{ font: 'normal normal 600 16px/13px Assistant', color: '#AB3C96', position: 'absolute', top: '20%', cursor: 'pointer' }}>אפס מסע</p> */}
            <p onClick={() => setShowResetMsg(true)} style={{ font: 'normal normal 600 16px/13px Assistant', color: '#AB3C96', top: '20%', cursor: 'pointer' }}>אפס מסע</p>

            <Example2
                text="המסע ימחק ולא יהיה ניתן לשחזר אותו"
                header="?האם לאפס את המסע שלך"
                open={showResetMsg}
                setOpen={setShowResetMsg}
                onAccept={() => { resetAll(); }}
                cencelBtn={true} okBtnText='אני רוצה לאפס את המסע' />
            {showLoadingPage ? <LoadingPage /> : ''}
        </span>
    );
};

export default ResetCups;