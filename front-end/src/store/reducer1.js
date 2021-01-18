// const { fromJS } = require('immutable');
// const structur = fromJS(
//     {
//         user_details: {
//             email: null,
//             is_admin: 0
//         },
//         loading: { val: false }
//     }
// );


// const reducer1 = (state = structur, action) => {
//     switch (action.type) {
//         case 'AUTH':
//             const updatedAuth = state.updateIn(['user_details'], () => action.val)
//             return updatedAuth;
//         default:
//             return state;
//     }
// };


// const initState = { token: '', userId: '', loginModalOpened: true, msgsList: [] };
const initState = {
    // user_details: {
    //     email: null,
    //     is_admin: 0,
    //     userId: undefined,
    //     photoUrl: null
    // },
    user_details: {
        date_of_birth: null,
        date_of_registering: null,
        display_name: null,
        email: null,
        filled_feedback: null,
        is_admin: 0,
        user_first_name: null,
        user_last_name: null,
        user_name: null
    },
    loading: { val: false },
    chaptersAndCups: undefined,
    refsToBeginOfParts: [],
    refEndLastPart: undefined,
    updateGoalsOrHabitChanged: true,
};

const ChangeChapterReadStatus = (chapter, is_readed) => {
    if (is_readed)
        return { ...chapter, is_readed }
    else
        if (chapter.automatic_win)
            return { ...chapter, is_readed, victory_cups_wined: chapter.max_victory_cups }
        else
            return { ...chapter, is_readed, victory_cups_wined: 0 }
}


const reducer1 = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case 'AUTH':
            // state = { ...state, user_details: { ...state.user_details, email: action.val.email, is_admin: action.val.is_admin } }
            state = { ...state, user_details: { ...action.val } }
            break;
        case 'UPDATEUSERID':
            state = { ...state, user_details: { ...state.user_details, userId: action.val } }
            break;
        case 'CHAPTERSANDCUPS':
            state = { ...state, chaptersAndCups: action.val }
            break;
        case 'UPDATEWINEDCUPSCHAPTER':
            state = {
                ...state,
                chaptersAndCups: state.chaptersAndCups.map(chapter =>
                    chapter.id === action.chapterId
                        && action.victory_cups_wined <= chapter.max_victory_cups
                        && action.victory_cups_wined >= 0
                        && !chapter.automatic_win
                        ? { ...chapter, victory_cups_wined: action.victory_cups_wined }
                        : chapter
                )
            };
            break;
        case 'CHANGECHAPTERREADSTATUS':
            state = {
                ...state,
                chaptersAndCups: state.chaptersAndCups.map(chapter =>
                    chapter.id === action.chapterId ? ChangeChapterReadStatus(chapter, action.is_readed)
                        : chapter
                )
            };
            break;
        case 'ADDREFTOBEGINOFPART':
            console.log(action);

            state = {
                ...state,
                chaptersAndCups: state.chaptersAndCups.map(ch => ch),
                refsToBeginOfParts: [...state.refsToBeginOfParts, action.ref]
            }
            break;
        case 'CLEANREFSTOBEGINOFPARTS':
            if (!state.refsToBeginOfParts)
                break;
            state = {
                ...state,
                chaptersAndCups: undefined,
                refsToBeginOfParts: []
            }
            break;
        case 'RefEndLastPart':
            state = { ...state, refEndLastPart: action.myRef };
            break;
        case 'GoalsOrHabitChangedInfromColoredDivs':
            // state = { ...state, updateGoalsOrHabitChanged: !state.updateGoalsOrHabitChanged }
            state = { ...state }
            break;
        default:
            return state;
    }
    return state;
};



export default reducer1;
