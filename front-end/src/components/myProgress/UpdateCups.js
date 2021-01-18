import { baseUrl } from '../../utils/StaticData';
import { axiosInstance } from '../../utils/StaticData';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';





export const updateCupsServer = async (chapterId, winedCups) => {
    // const msg = await axios.post(
    //     baseUrl + 'update_user_cups',
    //     { "newCups": winedCups, "chapterId": chapterId },
    //     { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    // );
    const msg = await axiosInstance.post(
        '/update_user_cups',
        { "newCups": winedCups, "chapterId": chapterId }
    );
    return msg;
}



export const updateGoalsOrHobitsServer = async (goals_selected, max_goals, numOfGoalsAchived) => {
    // const msg = await axios.post(
    //     baseUrl + 'update_user_goals',
    //     { goals_selected, max_goals, numOfGoalsAchived },
    //     { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    // );
    const msg = await axiosInstance.post(
        '/update_user_goals',
        { goals_selected, max_goals, numOfGoalsAchived }
    );
    return msg;
}


export const updateChapterReadStatusServer = async (chapterId, is_readed) => {
    // const msg = await axios.post(
    //     baseUrl + 'update_chapter_read_status',
    //     { is_readed, chapterId },
    //     { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    // );
    const msg = await axiosInstance.post(
        '/update_chapter_read_status',
        { is_readed, chapterId }
    );
    return msg;
}

export const is_user = async () => {
    console.log(baseUrl);
    let msg;
    try {
        // msg = await axios.post(
        //     baseUrl + 'is_authed_user',
        //     { "a": "a" },
        //     { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        // );
        msg = await axiosInstance.post('/is_authed_user');
    }
    catch {
        return '401'
    }
    return msg;
}

export const resetUserCups = async () => {
    // const msg = await axios.post(
    //     baseUrl + 'reset_user_cups',
    //     { a: "a" },
    //     { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    // );
    const msg = await axiosInstance.post('/reset_user_cups');
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
    // await axios.post(
    //     baseUrl + 'get_user_cups',
    //     { "a": "a" },
    //     { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    // )
    await axiosInstance.post(
        '/get_user_cups'
    ).then(res =>
        response = res
    )
    // dispatch({ type: 'CHAPTERSANDCUPS', val: response.data.rows });
    console.log(response);
    return response;
}

export const getGoalsOrhabits = async () => {
    let response;
    // await axios.post(
    //     baseUrl + 'get_goals_or_habits',
    //     { "a": "a" },
    //     { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    // )
    await axiosInstance.post('/get_goals_or_habits')
        .then(res => response = res)
    // dispatch({ type: 'CHAPTERSANDCUPS', val: response.data.rows });
    console.log(response);
    return response;
}




