import { SNACKBAR_SUCCESS, SNACKBAR_ERROR, SNACKBAR_CLEAR, PROGRESSBAR_SHOW, PROGRESSBAR_CLEAR } from "../constants/action-types"

export function showSnackbarSuccess(payload){
    return { type: SNACKBAR_SUCCESS, payload }
};

export function showSnackbarError(payload){
    return { type: SNACKBAR_ERROR, payload }
};

export function snackbarClear(){
    return { type: SNACKBAR_CLEAR }
};

export function progressbarShow(){
    return { type: PROGRESSBAR_SHOW }
};

export function progressbarClear(){
    return { type: PROGRESSBAR_CLEAR }
};