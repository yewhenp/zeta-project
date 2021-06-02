import {
  RUN_FILTER,
  LOGIN,
  LOGOUT,
  GET_POST_LIST_SUCCESS,
  SET_SEARCH_STRING,
} from '../actions'

const initialState = {
  selectedValues: [],
  isLogined: false,
  username: '',
  userID: null,
  postList: [],
  postCount: 0,
  searchString: '',
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
    case SET_SEARCH_STRING: {
      return {
        ...state,
        searchString: action.payload,
      }
    }
    default:
      return state
  }
}

export default filterReducer
