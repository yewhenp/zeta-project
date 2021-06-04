import {
  SETUP_COMMENTS,
  SETUP_POST,
  UPDATE_POST_VOTES,
  UPDATE_COMMENT_VOTES,
  ADD_COMMENT,
  UPDATE_USER_VOTES,
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

const updateUserVotes = votes => dispatch => {
  dispatch({
    type: UPDATE_USER_VOTES,
    payload: { ...votes },
  })
}

const fetchUserVotes = () => async (dispatch, getState) => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const currState = getState()
  fetch(`${BASE_API}/votes/${currState.userID}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      post_id: currState.post.id,
      comments_id: currState.comments.map(comment => comment.id),
    }),
  })
    .then(response => response.json())
    .then(response => dispatch(updateUserVotes(response.response)))
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

const updateVotes = (id, votes) => async (dispatch, getState) => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  let currState = getState()
  if (currState.isLogined) {
    await (!currState.userVotes &&
      fetch(`${BASE_API}/votes/${currState.userID}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post_id: currState.post.id,
          comments_id: currState.comments.map(comment => comment.id),
        }),
      })
        .then(response => response.json())
        .then(response => dispatch(updateUserVotes(response.response))))
    currState = getState()
    if (id == null) {
      let voteState = currState.userVotes.post_id[currState.post.id]

      if (votes - currState.post.votes === -voteState || !voteState) {
        voteState += votes - currState.post.votes
        Promise.all([
          fetch(`${BASE_API}/posts/${currState.post.id}?votes=${votes}`, {
            method: 'PUT',
          }).then(dispatch(updatePostVotes(votes))),
          fetch(`${BASE_API}/votes/${currState.userID}`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              user_id: currState.userID,
              post_id: currState.post.id,
              comment_id: null,
              vote: voteState,
            }),
          }).then(
            (() => {
              const userVotes = { ...currState.userVotes }
              userVotes.post_id[currState.post.id] = voteState
              dispatch(updateUserVotes(userVotes))
            })(),
          ),
        ])
      }
    } else {
      const commentId = currState.comments[id].id
      const currVotes = currState.comments[id].votes
      let voteState = currState.userVotes.comments[commentId]

      if (votes - currVotes === -voteState || !voteState) {
        voteState += votes - currVotes
        Promise.all([
          fetch(
            `${BASE_API}/comments/${currState.comments[id].id}?votes=${votes}`,
            {
              method: 'PUT',
            },
          ).then(
            (() => {
              const newCommentsData = [...currState.comments]
              newCommentsData[id] = { ...newCommentsData[id], votes }
              newCommentsData.sort((a, b) => b.votes - a.votes)
              dispatch(updateCommentVotes(newCommentsData))
            })(),
          ),
          fetch(`${BASE_API}/votes/${currState.userID}`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              user_id: currState.userID,
              post_id: null,
              comment_id: commentId,
              vote: voteState,
            }),
          }).then(
            (() => {
              const userVotes = { ...currState.userVotes }
              userVotes.comments[commentId] = voteState
              dispatch(updateUserVotes(userVotes))
            })(),
          ),
        ])
      }
    }
  }
}

const addPostComment = (content, handleOnClose) => (dispatch, getState) => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const currState = getState()
  if (currState.userID !== null && currState.post.id !== null) {
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
      .then(handleOnClose())
  }
}

export {
  setUpPostView,
  updateVotes,
  addPostComment,
  handleCommentDialog,
  fetchUserVotes,
}
