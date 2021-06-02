import {
  SETUP_COMMENTS,
  SETUP_POST,
  UPDATE_POST_VOTES,
  UPDATE_COMMENT_VOTES,
} from '../actions/index'

const setUpComments = comments => ({
  type: SETUP_COMMENTS,
  payload: [...comments],
})

const setUpPost = post => ({
  type: SETUP_POST,
  payload: { ...post },
})

const updateCommentVotes = comments => ({
  type: UPDATE_COMMENT_VOTES,
  payload: comments,
})

const updatePostVotes = votes => ({
  type: UPDATE_POST_VOTES,
  payload: votes,
})

const setUpPostView = ID => dispatch => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  fetch(`${BASE_API}/posts/${ID}`)
    .then(response => response.json())
    .then(response => {
      dispatch(setUpPost(response.response))
      return response.response.comments
    })
    .then(commentsIDs =>
      Promise.all(
        commentsIDs.map(id =>
          fetch(`${BASE_API}/comments/${id}`).then(response => response.json()),
        ),
      ),
    )
    .then(comments =>
      dispatch(
        setUpComments(
          comments
            .map(value => value.response)
            .sort((a, b) => b.votes - a.votes),
        ),
      ),
    )
}

const updateVotes = (id, votes) => (dispatch, getState) => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const currState = getState()
  if (currState.isLogined) {
    if (id == null) {
      fetch(`${BASE_API}/posts/${currState.post.id}?votes=${votes}`).then(
        dispatch(updatePostVotes(votes)),
      )
    } else {
      fetch(
        `${BASE_API}/comments/${currState.comments[id].id}?votes=${votes}`,
      ).then(() => {
        const newCommentsData = [...currState.comments]
        newCommentsData[id] = { ...newCommentsData[id], votes }
        newCommentsData.sort((a, b) => b.votes - a.votes)
        dispatch(updateCommentVotes(newCommentsData))
      })
    }
  } else {
    console.log('Unknown user')
  }
}

export { setUpPostView, updateVotes }
