import React from 'react';
import { MdAddAlarm } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import ChapterNameCol from './ChapterNameCol';
import CupsCol from './CupsCol';
import './ShowProgress.css';
import { updateChapterReadStatusServer } from './UpdateCups';
import ReadedSign from '../helpComponents/ReadedSign';
import UnreadedSign from '../helpComponents/UnreadedSign';
import PerekTetCupsCol from './PerekTet/PerekTetCupsCol';
import { message } from 'antd';
import Cup from '../helpComponents/Cup';


const TableCupsRows = () => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const dispatch = useDispatch();

    const shwoReadFeedbackMsg = (chapter) => {
        message.success({
            content: '!אלוף',
            style: { color: '#C68E30', fontFamily: 'Avigul', fontSize: '30px' },
            icon: <span></span>
        });
        if (!chapter.automatic_win) {
            message.success({
                content: 'עכשיו הקלק על גביע לפי מספר הגביעים שגרפת',
                style: { color: '#C68E30' },
                icon: <Cup height={25} marginPx={3} gold={true} />
            });
        }
    }

    const MakeChapterReaded = async (chapter) => {
        shwoReadFeedbackMsg(chapter);
        dispatch({ type: 'CHANGECHAPTERREADSTATUS', chapterId: chapter.id, is_readed: true });
        const msg = await updateChapterReadStatusServer(chapter.id, true);
    }

    const MakeChapterUnReaded = async chapter => {
        dispatch({ type: 'CHANGECHAPTERREADSTATUS', chapterId: chapter.id, is_readed: false });
        const msg = await updateChapterReadStatusServer(chapter.id, false);
    }

    const CupsInNumbers = chapter => {
        return <p className="chapterName">{chapter.victory_cups_wined + '/' + chapter.max_victory_cups}</p>
    }

    const ReadedCol = chapter => {
        // if (chapter.is_readed)
        //     return <h6 onClick={() => MakeChapterUnReaded(chapter)}>v</h6>
        // return <h6>x</h6>
        if (chapter.is_readed)
            return <span style={{ cursor: 'pointer' }} onClick={() => MakeChapterUnReaded(chapter)}>
                <ReadedSign size={30} />
            </span>
        return <span><UnreadedSign size={30} /></span>
    }

    const PrintAutoWin = chapter => {
        if (chapter.automatic_win)
            return (<p className="chapterName" style={{ fontSize: 'x-small' }}>זכיה אוטומטית</p>)
        return ''
    }

    const nothing = () => {
        return;
    }

    let tdTagStyle = {};

    return (
        chaptersAndCups.map((chapter, index) => {
            const isNewPart =
                index === 0 ||
                chaptersAndCups[index - 1].part_number !== chapter.part_number;
            return (
                <tr key={index} onClick={!chapter.is_readed ? () => MakeChapterReaded(chapter) : nothing}
                    className={chapter.is_readed ? "Trow1" : "Trow1 " + "Trow1UnReded"}
                >
                    <td>
                        <ChapterNameCol key={chapter.id} chapter={chapter} isNewPart={isNewPart} />
                    </td>
                    <td>
                        {ReadedCol(chapter)}
                    </td>
                    <td style={tdTagStyle}>
                        {chapter.id === 11
                            ?
                            < PerekTetCupsCol chapter={chapter} />
                            :
                            <CupsCol key={chapter.id} goalsSelected={false} chapter={chapter} />
                        }
                    </td>
                    <td>
                        {CupsInNumbers(chapter)}
                        {PrintAutoWin(chapter)}
                    </td>
                </tr >
            )
        })
    );
};

export default TableCupsRows;