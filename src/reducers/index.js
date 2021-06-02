import { RUN_FILTER, LOGIN, LOGOUT, GET_POST_LIST_SUCCESS } from '../actions'

const initialState = {
  selectedValues: [],
  isLogined: false,
  username: '',
  userID: null,
  postList: [],
  postCount: 0,
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUN_FILTER: {
      return {
        ...state,
        selectedValues: action.payload,
      }
    }
    case LOGIN: {
      return {
        ...state,
        isLogined: true,
        username: action.payload.username,
        userID: action.payload.userID,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        isLogined: false,
        username: '',
        userID: null,
      }
    }
    case GET_POST_LIST_SUCCESS: {
      return {
        ...state,
        postList: action.payload,
        postCount: action.payload.length,
      }
    }
    default:
      return state
  }
}

export default filterReducer
