import { createStore } from "redux";
//import { applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
// import createSagaMiddleware from "redux-saga";
// import apiSaga from "../sagas/userApiSaga";

//const initializeSagaMiddleware = createSagaMiddleware();

//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer//, applyMiddleware(initializeSagaMiddleware)
);

//initializeSagaMiddleware.run(apiSaga);

export default store;