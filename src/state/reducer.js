import {
  QUESTIONS_SUCCESS,
  QUESTIONS_REQUEST,
  QUESTIONS_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE
} from "./actions";
const defaultState = {
  questions: [],
  users: [],
  isFetching: false,
  error: null,
};
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case QUESTIONS_REQUEST:
    case USER_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case QUESTIONS_FAILURE:
    case USER_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false,
      });
    case QUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        questions: [...state.questions, ...action.payload.questions],
        isFetching: false,
      });
    case USER_SUCCESS: {
      return Object.assign({}, state, {
        users: [...state.users, action.payload.user]
      })
    }
    default:
      return state;
  }
}
