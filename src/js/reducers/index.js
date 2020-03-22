import { SNACKBAR_SUCCESS, SNACKBAR_ERROR, SNACKBAR_CLEAR, PROGRESSBAR_SHOW, PROGRESSBAR_CLEAR } from "../constants/action-types";

const initialState = {
    progressbarOpen: false,

    snackbarSuccessOpen: false,
    snackbarSuccessMessage: '',
    snackbarErrorOpen: false,
    snackbarErrorMessage: '',
    snackbarInfoOpen: false,
    snackbarInfoMessage: '',
};

function rootReducer(state = initialState, action){
    if (action.type === SNACKBAR_SUCCESS) {
        return Object.assign({}, state, {
            ...state,
            snackbarSuccessOpen: true,
            snackbarSuccessMessage: action.payload.message
        });
    }
    
    if (action.type === SNACKBAR_ERROR) {
        return Object.assign({}, state, {
            ...state,
            snackbarErrorOpen: true,
            snackbarErrorMessage: action.payload.message
        });
    }

    if (action.type === SNACKBAR_CLEAR) {
        return Object.assign({}, state, {
            ...state,
            snackbarSuccessOpen: false,
            snackbarErrorOpen: false,
            snackbarInfoOpen: false
        });
    }
    
    if (action.type === PROGRESSBAR_SHOW) {
        return Object.assign({}, state, {
            ...state,
            progressbarOpen: true
        });
    }
    
    if (action.type === PROGRESSBAR_CLEAR) {
        return Object.assign({}, state, {
            ...state,
            progressbarOpen: false
        });
    }
    
    return state;
}

export default rootReducer;