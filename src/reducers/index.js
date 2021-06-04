import {
  RUN_FILTER,
  LOGIN,
  LOGOUT,
  SETUP_COMMENTS,
  SETUP_POST,
  UPDATE_COMMENT_VOTES,
  UPDATE_POST_VOTES,
  ADD_COMMENT,
  UPDATE_USER_VOTES,
  COMMENT_CREATE_DIALOG,
  GET_POST_LIST_SUCCESS,
  SET_SEARCH_STRING,
  LOAD_TAGS,
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
  isCommentDialogOpen: false,
  userVotes: null,
  comments: [],
  postList: [],
  postCount: 0,
  searchString: '',
  tags: [],
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
    case ADD_COMMENT: {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      }
    }
    case UPDATE_USER_VOTES: {
      return {
        ...state,
        userVotes: action.payload,
      }
    }
    case COMMENT_CREATE_DIALOG: {
      return {
        ...state,
        isCommentDialogOpen: action.payload,
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
    case LOAD_TAGS: {
      return {
        ...state,
        tags: action.payload,
      }
    }
    default:
      return state
  }
}

export default filterReducer
