import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChapterNameCol from './ChapterNameCol';
import CupsCol from './CupsCol';


const TableCupsRows = () => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);

    const CupsInNumbers = chapter => {
        return chapter.wined_cups + '/' + chapter.max_victory_cups;
    }

    const PrintAutoWin = chapter => {
        if (chapter.automatic_win)
            return (<p style={{ fontSize: 'x-small' }}>זכיה אוטומטית</p>)
        return ''
    }

    let tdTagStyle = {};

    return (
        chaptersAndCups.map((chapter, index) => {
            return (
                <tr key={index} className="Trow1">
                    <td>
                        <ChapterNameCol chapterId={chapter.id} chapterName={chapter.chapter_name} />
                    </td>
                    <td style={tdTagStyle}>
                        <CupsCol chapter={chapter} />
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