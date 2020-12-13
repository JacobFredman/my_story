import React from 'react';
import { MdAddAlarm } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import ChapterNameCol from './ChapterNameCol';
import CupsCol from './CupsCol';
import './ShowProgress.css';


const TableCupsRows = () => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);
    const dispatch = useDispatch();

    const MakeChapterReaded = chapter => {
        dispatch({ type: 'CHANGECHAPTERREADSTATUS', chapterId: chapter.id, is_readed: true })
    }

    const MakeChapterUnReaded = chapter => {
        dispatch({ type: 'CHANGECHAPTERREADSTATUS', chapterId: chapter.id, is_readed: false })
    }

    const CupsInNumbers = chapter => {
        return chapter.victory_cups_wined + '/' + chapter.max_victory_cups;
    }

    const ReadedCol = chapter => {
        if (chapter.is_readed)
            return <h6 onClick={() => MakeChapterUnReaded(chapter)}>v</h6>
        return <h6>x</h6>
    }

    const PrintAutoWin = chapter => {
        if (chapter.automatic_win)
            return (<p style={{ fontSize: 'x-small' }}>זכיה אוטומטית</p>)
        return ''
    }

    let tdTagStyle = {};

    return (
        chaptersAndCups.map((chapter, index) => {
            const isNewPart =
                index === 0 ||
                chaptersAndCups[index - 1].part_number !== chapter.part_number;
            return (
                <tr key={index} onClick={!chapter.is_readed ? () => MakeChapterReaded(chapter) : ''}
                    className={chapter.is_readed ? "Trow1" : "Trow1 " + "Trow1UnReded"}
                >
                    <td>
                        <ChapterNameCol chapter={chapter} isNewPart={isNewPart} />
                    </td>
                    <td style={tdTagStyle}>
                        <CupsCol chapter={chapter} />
                    </td>
                    <td>
                        {ReadedCol(chapter)}
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