import {
  SETUP_COMMENTS,
  SETUP_POST,
  UPDATE_POST_VOTES,
  UPDATE_COMMENT_VOTES,
  ADD_COMMENT,
  COMMENT_CREATE_DIALOG,
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

const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
})

const handleCommentDialog = open => dispatch => {
  dispatch({
    type: COMMENT_CREATE_DIALOG,
    payload: open,
  })
}

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
    .then(comments => {
      dispatch(
        setUpComments(
          comments
            .map(value => value.response)
            .sort((a, b) => b.votes - a.votes),
        ),
      )
    })
}

const updateVotes = (id, votes) => (dispatch, getState) => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const currState = getState()
  if (currState.isLogined) {
    if (id == null) {
      fetch(`${BASE_API}/posts/${currState.post.id}?votes=${votes}`, {
        method: 'PUT',
      }).then(dispatch(updatePostVotes(votes)))
    } else {
      fetch(
        `${BASE_API}/comments/${currState.comments[id].id}?votes=${votes}`,
        {
          method: 'PUT',
        },
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

const addPostComment = content => (dispatch, getState) => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const currState = getState()
  if (currState.userID == null) {
    console.log('Unknown user')
  } else if (currState.post.id == null) {
    console.log("Post for commenting hasn't been selected")
  } else {
    fetch(`${BASE_API}/comments/0`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        content,
        post_id: currState.post.id,
        author_id: currState.userID,
      }),
    })
      .then(response => response.json())
      .then(response => fetch(`${BASE_API}/comments/${response.response}`))
      .then(response => response.json())
      .then(response => dispatch(addComment(response.response)))
      .then(dispatch(handleCommentDialog(false)))
  }
}

export { setUpPostView, updateVotes, addPostComment, handleCommentDialog }
