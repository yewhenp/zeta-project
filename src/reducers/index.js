import { RUN_FILTER, LOGIN, LOGOUT } from '../actions'

const initialState = {
  selectedValues: [],
  isLogined: false,
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
      }
    }
    case LOGOUT: {
      return {
        ...state,
        isLogined: false,
      }
    }
    default:
      return state
  }
}

export default filterReducer
