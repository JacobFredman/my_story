import { baseUrl } from '../../utils/StaticData';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';




export const updateCupsServer = async (chapterId, winedCups) => {
    const msg = await axios.post(
        baseUrl + 'update_user_cups',
        { "newCups": winedCups, "chapterId": chapterId },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    return msg;
}

// const GetchaptersAndCupsWithUpdatedCups = (chaptersAndCups, action) => {
//     const changeValue = (chapter) => {
//         return chapter.id === action.chapterId
//             && action.wined_cups <= chapter.max_victory_cups
//             && action.wined_cups >= 0
//             && !chapter.wined_cups
//     }


//     return chaptersAndCups.map(chapter =>
//         changeValue ? { ...chapter, wined_cups: action.wined_cups } : chapter
//     )
// }



export const getChaptersAndCups = async () => {
    let response;
    await axios.post(
        baseUrl + 'get_user_cups',
        { "a": "a" },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    )
        .then(res => response = res)
    // dispatch({ type: 'CHAPTERSANDCUPS', val: response.data.rows });
    console.log(response);
    return response;
}

