import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import historyReducer from '../reducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  history: historyReducer,
  // other reducers
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
