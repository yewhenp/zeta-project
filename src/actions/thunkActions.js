import {
  GET_POST_LIST_SUCCESS,
  GET_POST_LIST_ERROR,
  LOAD_TAGS,
  LOAD_TAGS_ERROR,
} from './index'

const fetchPostList = () => dispatch => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const postUrl = `${BASE_API}/posts/1?many=true&from=0&to=-1`

  fetch(postUrl)
    .then(res => res.json())
    .then(data => data.response)
    .then(data => {
      dispatch({ type: GET_POST_LIST_SUCCESS, payload: data })
    })
    .catch(err => dispatch({ type: GET_POST_LIST_ERROR, payload: err }))
}

const createTag = tagName => dispatch => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const tagsUrl = `${BASE_API}/tags/1`

  fetch(tagsUrl, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ label: tagName }),
  })
    .then(() => {
      fetch(tagsUrl, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => data.response)
        .then(data => {
          dispatch({ type: LOAD_TAGS, payload: data })
        })
        .catch(err => dispatch({ type: LOAD_TAGS_ERROR, payload: err }))
    })
    .catch(err => dispatch({ type: LOAD_TAGS_ERROR, payload: err }))
}

const loadTags = () => dispatch => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const tagsUrl = `${BASE_API}/tags/1`

  fetch(tagsUrl, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data.response)
    .then(data => {
      dispatch({ type: LOAD_TAGS, payload: data })
    })
    .catch(err => dispatch({ type: LOAD_TAGS_ERROR, payload: err }))
}

export { fetchPostList, createTag, loadTags }
