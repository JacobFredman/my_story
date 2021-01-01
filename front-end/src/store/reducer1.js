// const { fromJS } = require('immutable');
// const structur = fromJS(
//     {
//         tokenAndDetails: {
//             email: null,
//             is_admin: 0
//         },
//         loading: { val: false }
//     }
// );


// const reducer1 = (state = structur, action) => {
//     switch (action.type) {
//         case 'AUTH':
//             const updatedAuth = state.updateIn(['tokenAndDetails'], () => action.val)
//             return updatedAuth;
//         default:
//             return state;
//     }
// };


// const initState = { token: '', userId: '', loginModalOpened: true, msgsList: [] };
const initState = {
    tokenAndDetails: {
        email: null,
        is_admin: 0,
        userId: undefined
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
    switch (action.type) {
        case 'AUTH':
            state = { ...state, tokenAndDetails: { ...state.tokenAndDetails, email: action.val.email, is_admin: action.val.is_admin } }
            break;
        case 'UPDATEUSERID':
            state = { ...state, tokenAndDetails: { ...state.tokenAndDetails, userId: action.val } }
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
