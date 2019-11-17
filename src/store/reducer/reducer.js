import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    USER_VERIFICATION: null,
    USER_NUMBER: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USER_VERIFICATION:
            return ({
                ...state,
                USER_VERIFICATION: action.payload
            })
        case ActionTypes.USER_NUMBER:
            return ({
                ...state,
                USER_NUMBER: action.payload
            })
        default:
            return state;
    }

}