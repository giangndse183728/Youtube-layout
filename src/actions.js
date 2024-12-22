// actionTypes.js
export const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';

// actions.js
export const addSearchHistory = (query) => ({
  type: ADD_SEARCH_HISTORY,
  payload: query,
});

export const clearSearchHistory = () => ({
  type: CLEAR_SEARCH_HISTORY,
});
