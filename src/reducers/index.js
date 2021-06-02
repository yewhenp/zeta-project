import {
  RUN_FILTER,
  LOGIN,
  LOGOUT,
  SETUP_COMMENTS,
  SETUP_POST,
  UPDATE_COMMENT_VOTES,
  UPDATE_POST_VOTES,
} from '../actions'

const initialState = {
  selectedValues: [],
  isLogined: false,
  username: '',
  userID: null,
  post: {
    id: null,
    title: '',
    content: '',
    timeCreated: '',
    timeLastActive: '',
    views: 0,
    author: {
      nickname: '',
      avatarIcon: '',
      userRating: 0,
    },
    votes: 0,
    tags: [],
  },
  comments: [],
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
    case SETUP_COMMENTS: {
      return {
        ...state,
        comments: action.payload,
      }
    }
    case SETUP_POST: {
      return {
        ...state,
        post: action.payload,
      }
    }
    case UPDATE_COMMENT_VOTES: {
      return {
        ...state,
        comments: action.payload,
      }
    }
    case UPDATE_POST_VOTES: {
      return {
        ...state,
        post: { ...state.post, votes: action.payload },
      }
    }
    default:
      return state
  }
}

export default filterReducer
