import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import Cup from '../helpComponents/Cup';
import { updateCupsServer, updateCupsArray } from './UpdateCups';
import { useSelector, useDispatch } from 'react-redux';
import { getChaptersAndCups } from './UpdateCups';
import './Cup.css';





const CupsCol = (props) => {
    const [cupIdMouseOver, setIdCupMouseOver] = useState(undefined);

    const dispatch = useDispatch();

    const UpdateCupsClient = (chapterId, victory_cups_wined) => {
        dispatch({ type: 'UPDATEWINEDCUPSCHAPTER', chapterId, victory_cups_wined });
    }

    const getData = async () => {
        // await getGoalsOrHabits();
        const rowsData = await getChaptersAndCups();
        dispatch({ type: 'CHAPTERSANDCUPS', val: rowsData.data.rows });
    }

    const UpdateCups = async (chapterId, victory_cups_wined) => {
        UpdateCupsClient(chapterId, victory_cups_wined);
        const msg = await updateCupsServer(chapterId, victory_cups_wined);
        getData();
    }

    const aa = (a) => {
        // alert(a);
        console.log(a);
    }


    const goalsOrHabitsChapterId = 11;

    const CreateCupsArray = chapter => {
        let result = [<GrFormClose key={0} onClick={() => UpdateCups(chapter.id, 0)} />];

        // if (chapterId === goalsOrHabitsChapterId && this.state.goalsSelected)
        //     tdTagStyle = { backgroundColor: '#bfbfbf' };


        for (let i = 1; i <= chapter.max_victory_cups; i++) {
            let id = i // important!
            const cup = (
                < span
                    onMouseOver={() => setIdCupMouseOver(id)}
                    onMouseLeave={() => setIdCupMouseOver(-1)}
                    className={!chapter.automatic_win && chapter.is_readed ? 'CupUnAutoWin' : ''}
                    onClick={() => chapter.is_readed ? UpdateCups(chapter.id, id) : ''}
                >
                    <Cup
                        key={id}
                        automatic_win={chapter.automatic_win}
                        height={cupIdMouseOver === id && !chapter.automatic_win && chapter.is_readed ? 27 : 25}
                        // setIdCupMouseOver={setIdCupMouseOver}
                        marginPx={3}
                        gold={i <= chapter.victory_cups_wined ? true : false}
                    />
                </span>
            )
            result.push(cup)
        }
        return result;
    }


    const cupsArray = CreateCupsArray(props.chapter);
    return cupsArray;
};

export default CupsCol;