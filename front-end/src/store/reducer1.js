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
        is_admin: 0
    },
    loading: { val: false },
    chaptersAndCups: undefined,

    refEndLastPart: undefined
};


const reducer1 = (state = initState, action) => {
    switch (action.type) {
        case 'AUTH':
            state = { ...state, tokenAndDetails: action.val }
            break;
        case 'CHAPTERSANDCUPS':
            state = { ...state, chaptersAndCups: action.val };
            break;
        case 'RefEndLastPart':
            state = { ...state, refEndLastPart: action.val };
            break;
        default:
            return state;
    }
    return state;
};



export default reducer1;
