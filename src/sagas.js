import { takeEvery, put, select } from 'redux-saga/effects';
import { ADD_SEARCH_HISTORY, CLEAR_SEARCH_HISTORY } from './actions';

function* addSearchHistorySaga(action) {
  try {
    const currentHistory = yield select(state => state.history);
    const flatHistory = Array.isArray(currentHistory) ? currentHistory.flat(Infinity).filter(item => typeof item === 'string') : [];
    const newHistory = [action.payload, ...flatHistory].filter((v, i, a) => a.indexOf(v) === i).slice(0, 10);

    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    yield put({ type: 'UPDATE_SEARCH_HISTORY', payload: newHistory });
  } catch (error) {
    console.error('Error saving search history:', error);
  }
}

function* clearSearchHistorySaga() {
  try {
    localStorage.removeItem('searchHistory');
    yield put({ type: 'UPDATE_SEARCH_HISTORY', payload: [] });
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
}

export function* watchSearchHistory() {
  yield takeEvery(ADD_SEARCH_HISTORY, addSearchHistorySaga);
  yield takeEvery(CLEAR_SEARCH_HISTORY, clearSearchHistorySaga);
}

export default function* rootSaga() {
  yield watchSearchHistory();
}