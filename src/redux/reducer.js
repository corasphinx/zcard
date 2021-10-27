import {
  SET_CURRENT_USER,
} from './types';

// set default Redux state
const initialState = {
  currentUser: {},
};

// reducer with cases for Redux
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state, currentUser: action.user
      };
  }
}

export default reducer;