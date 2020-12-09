import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import Cup from '../helpComponents/Cup';


const updateCups = (a, b) => {
    return '';
}

const goalsOrHabitsChapterId = 11;

const CreateCupsArray = chapter => {
    let result = [<GrFormClose key={0} onClick={() => updateCups(chapter.id, 0)} />];

    // if (chapterId === goalsOrHabitsChapterId && this.state.goalsSelected)
    //     tdTagStyle = { backgroundColor: '#bfbfbf' };

    var i = 1;
    for (; i <= chapter.wined_cups; i++) {
        let a = i // important!
        result.push(
            <span onClick={() => updateCups(chapter.id, a)}>
                <Cup key={a} height={25} marginPx={3} gold={true} onClick={() => updateCups(chapter.id, a)} />
            </span>
        )
    }

    for (; i <= chapter.max_victory_cups; i++) {
        let a = i // important!
        result.push(
            <span onClick={() => updateCups(chapter.id, a)}>
                <Cup key={a} height={25} marginPx={3} gold={false} onClick={() => updateCups(chapter.id, a)} />
            </span>
        )
    }
    return result;
}


const CupsCol = (props) => {
    const cupsArray = CreateCupsArray(props.chapter);
    let tdTagStyle = {};

    return (
        <td style={tdTagStyle}>
            {cupsArray}
        </td>
    );
};

export default CupsCol;