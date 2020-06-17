const { fromJS } = require('immutable');
const structur = fromJS(
    {
        tokenAndDetails: {
            encodedToken: null,
            USR_LVL_ID: null,
            USR_NAME: null
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
        default:
            return state;
    }
};

export default reducer1;
