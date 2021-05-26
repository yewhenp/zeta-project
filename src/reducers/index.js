import { RUN_FILTER, LOGIN, LOGOUT } from '../actions'

const initialState = {
  selectedValues: [],
  isLogined: false,
  username: '',
  userID: null,
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
    default:
      return state
  }
}

export default filterReducer
