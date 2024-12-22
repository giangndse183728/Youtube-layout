import { ADD_SEARCH_HISTORY, CLEAR_SEARCH_HISTORY } from "./actions";

const parseInitialState = () => {
  try {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory'));
    return Array.isArray(savedHistory) ? savedHistory.flat(Infinity).filter(item => typeof item === 'string') : [];
  } catch (error) {
    console.error('Error parsing search history:', error);
    return [];
  }
};

const initialState = parseInitialState();

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_HISTORY':
      return action.payload;
    default:
      return state;
  }
};

export default historyReducer;