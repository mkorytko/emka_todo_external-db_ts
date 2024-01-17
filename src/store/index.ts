import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;

export default store;

sagaMiddleware.run(rootSaga);
