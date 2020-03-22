// import { takeEvery, call, put } from "redux-saga/effects";
// import { DATA_LOADED, API_ERRORED } from "../constants/action-types";

// export default function* watcherSaga(){
//     yield takeEvery("DATA_REQUESTED", workerSage);
// }

// function* workerSage(action){
//     try {
//         const payload = yield call(getData, action.payload.url);
//         yield put({ type: DATA_LOADED, payload });
//     } catch(e){
//         yield put({ type: API_ERRORED, payload: e });
//     }
// }

// function getData(url) {
//     return fetch(url)
//         .then(response => {
//             if(!response.ok){
//                 throw Error(response.statusText);
//             }
            
//             return response.json();
//         });
// }