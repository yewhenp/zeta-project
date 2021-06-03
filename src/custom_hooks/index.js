import { useDispatch, useSelector } from 'react-redux'
import { LOGIN, LOGOUT } from '../actions'

function useLogin() {
  const logined = useSelector(state => state.isLogined)
  const dispatch = useDispatch()

  const setLogined = (login, username = null, userID = null) => {
    if (login) {
      dispatch({
        type: LOGIN,
        payload: {
          username,
          userID,
        },
      })
    } else {
      dispatch({
        type: LOGOUT,
      })
    }
  }

  return [logined, setLogined]
}

export default useLogin
