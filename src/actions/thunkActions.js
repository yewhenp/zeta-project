import { GET_POST_LIST_SUCCESS, GET_POST_LIST_ERROR } from './index'

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

export default fetchPostList
