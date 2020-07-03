const { fromJS } = require('immutable');
const structur = fromJS(
    {
        tokenAndDetails: {
            email: null,
            is_admin: 0
        },
        loading: { val: false }
    }
);


const reducer1 = (state = structur, action) => {
    switch (action.type) {
        case 'CONSTLISTS':
            const updatedConstLists = state.updateIn(['constLists', action.name], () => action.val);
            return updatedConstLists;
        case 'SEARCHINFO':
            const updatedPPLSearchInfo = state.updateIn(['searchInfo', action.name], () => action.val);
            return updatedPPLSearchInfo;
        case 'AUTH':
            const updatedAuth = state.updateIn(['tokenAndDetails'], () => action.val)
            return updatedAuth;
        default:
            return state;
    }
};

export default reducer1;
