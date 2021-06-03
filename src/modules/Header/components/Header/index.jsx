import React, { useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'

import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import CreatePost from '../CreatePost'
import LoginForm from '../../../Auth/components/LoginForm'
import CreateComment from '../../../Posts/components/CreateComment'

import { styles, theme } from './styles'

import { LOGIN, LOGOUT, SET_SEARCH_STRING } from '../../../../actions'

const useStyles = makeStyles(styles)

const Header = () => {
  const classes = useStyles()
  const logined = useSelector(state => state.isLogined)
  // const postID = useSelector(state => state.post.id)
  const dispatch = useDispatch()

  const childRefCreatePost = useRef()
  const onClickCreatePost = () => {
    childRefCreatePost.current.handleClickOpen()
  }

  const childRefLogin = useRef()
  const onClickHandleLogin = () => {
    childRefLogin.current.handleClickOpen()
  }

  // is called by login dialog when logging
  const handleLogin = (username, userID) => {
    dispatch({
      type: LOGIN,
      payload: {
        username,
        userID,
      },
    })
  }

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    })
  }

  const menuId = 'primary-search-account-menu'

  return (
    <div className={classes.grow}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.logoButton}
              color="inherit"
              aria-label="Zeta project"
              component={RouterLink}
              to="/"
            >
              <LogoIcon edge="start" style={{ fontSize: 80 }} />
            </IconButton>
            <div className={classes.grow} />
            {logined && (
              <Button
                onClick={onClickCreatePost}
                variant="contained"
                color="secondary"
                endIcon={<AddIcon />}
              >
                Create post
              </Button>
            )}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={event => {
                  dispatch({
                    type: SET_SEARCH_STRING,
                    payload: event.target.value,
                  })
                }}
              />
            </div>
            {logined && (
              <IconButton
                edge="end"
                aria-label="Logout button"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleLogout}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            )}
            {!logined && (
              <IconButton
                edge="end"
                aria-label="Login button"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={onClickHandleLogin}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Toolbar>
          <CreatePost ref={childRefCreatePost} />
          <CreateComment />
          <LoginForm ref={childRefLogin} loginHandle={handleLogin} />
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

function LogoIcon(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SvgIcon {...props}>
      <path d="M 1.730469 17.09375 L 1.550781 17.09375 C 1.550781 17.007812 1.53125 16.957031 1.496094 16.9375 C 1.464844 16.914062 1.375 16.90625 1.234375 16.90625 C 1.097656 16.90625 1.011719 16.914062 0.980469 16.9375 C 0.941406 16.960938 0.929688 17.015625 0.929688 17.09375 C 0.929688 17.222656 0.984375 17.289062 1.105469 17.292969 L 1.25 17.300781 L 1.433594 17.3125 C 1.652344 17.320312 1.765625 17.433594 1.765625 17.660156 C 1.765625 17.796875 1.730469 17.890625 1.65625 17.9375 C 1.582031 17.988281 1.445312 18.019531 1.253906 18.019531 C 1.050781 18.019531 0.914062 17.988281 0.839844 17.941406 C 0.761719 17.894531 0.726562 17.804688 0.726562 17.679688 L 0.726562 17.609375 L 0.914062 17.609375 L 0.914062 17.664062 C 0.914062 17.75 0.933594 17.800781 0.976562 17.828125 C 1.011719 17.851562 1.097656 17.867188 1.214844 17.867188 C 1.359375 17.867188 1.460938 17.851562 1.507812 17.824219 C 1.554688 17.796875 1.578125 17.738281 1.578125 17.648438 C 1.578125 17.519531 1.515625 17.457031 1.402344 17.457031 C 1.128906 17.457031 0.953125 17.433594 0.867188 17.386719 C 0.777344 17.339844 0.738281 17.246094 0.738281 17.097656 C 0.738281 16.960938 0.773438 16.875 0.839844 16.824219 C 0.910156 16.785156 1.042969 16.761719 1.242188 16.761719 C 1.570312 16.761719 1.730469 16.859375 1.730469 17.050781 Z M 3.339844 16.761719 C 3.566406 16.761719 3.710938 16.796875 3.777344 16.878906 C 3.847656 16.953125 3.882812 17.121094 3.882812 17.386719 C 3.882812 17.648438 3.847656 17.820312 3.777344 17.898438 C 3.710938 17.976562 3.566406 18.019531 3.339844 18.019531 C 3.113281 18.019531 2.96875 17.976562 2.898438 17.898438 C 2.835938 17.820312 2.796875 17.648438 2.796875 17.386719 C 2.796875 17.121094 2.835938 16.953125 2.898438 16.878906 C 2.96875 16.796875 3.113281 16.761719 3.339844 16.761719 Z M 3.339844 16.90625 C 3.179688 16.90625 3.082031 16.933594 3.042969 16.980469 C 3.003906 17.03125 2.984375 17.167969 2.984375 17.386719 C 2.984375 17.609375 3.003906 17.738281 3.042969 17.792969 C 3.082031 17.84375 3.179688 17.867188 3.339844 17.867188 C 3.5 17.867188 3.597656 17.84375 3.636719 17.792969 C 3.675781 17.738281 3.691406 17.609375 3.691406 17.386719 C 3.691406 17.167969 3.675781 17.03125 3.636719 16.980469 C 3.597656 16.933594 3.5 16.90625 3.339844 16.90625 Z M 5.015625 18 L 5.015625 16.925781 L 4.828125 16.925781 L 4.828125 16.773438 L 5.015625 16.773438 L 5.015625 16.59375 C 5.015625 16.355469 5.136719 16.238281 5.382812 16.238281 C 5.421875 16.238281 5.464844 16.242188 5.515625 16.246094 L 5.515625 16.390625 C 5.453125 16.386719 5.410156 16.382812 5.386719 16.382812 C 5.257812 16.382812 5.195312 16.449219 5.195312 16.574219 L 5.195312 16.773438 L 5.515625 16.773438 L 5.515625 16.925781 L 5.195312 16.925781 L 5.195312 18 Z M 7.121094 16.773438 L 7.121094 16.925781 L 6.652344 16.925781 L 6.652344 17.667969 C 6.652344 17.800781 6.707031 17.867188 6.824219 17.867188 C 6.9375 17.867188 6.996094 17.808594 6.996094 17.691406 L 7 17.632812 L 7 17.566406 L 7.164062 17.566406 L 7.167969 17.65625 C 7.167969 17.894531 7.054688 18.015625 6.824219 18.015625 C 6.589844 18.015625 6.472656 17.917969 6.472656 17.714844 L 6.472656 16.925781 L 6.300781 16.925781 L 6.300781 16.773438 L 6.472656 16.773438 L 6.472656 16.480469 L 6.652344 16.480469 L 6.652344 16.773438 Z M 9.726562 16.773438 L 9.386719 18 L 9.117188 18 L 8.953125 17.320312 L 8.90625 17.113281 L 8.882812 17.007812 L 8.859375 16.90625 L 8.855469 16.90625 L 8.832031 17.007812 L 8.808594 17.113281 L 8.757812 17.320312 L 8.589844 18 L 8.316406 18 L 7.988281 16.773438 L 8.175781 16.773438 L 8.351562 17.453125 L 8.402344 17.664062 L 8.425781 17.773438 L 8.453125 17.875 L 8.460938 17.875 L 8.484375 17.773438 L 8.507812 17.664062 L 8.5625 17.453125 L 8.726562 16.773438 L 8.988281 16.773438 L 9.15625 17.453125 L 9.203125 17.664062 L 9.230469 17.773438 L 9.253906 17.875 L 9.285156 17.773438 L 9.308594 17.664062 L 9.363281 17.453125 L 9.53125 16.773438 Z M 10.886719 17.117188 L 10.710938 17.117188 C 10.710938 16.976562 10.742188 16.882812 10.804688 16.832031 C 10.871094 16.785156 10.996094 16.761719 11.1875 16.761719 C 11.390625 16.761719 11.527344 16.789062 11.597656 16.847656 C 11.671875 16.910156 11.703125 17.023438 11.703125 17.191406 L 11.703125 18 L 11.527344 18 L 11.539062 17.867188 L 11.535156 17.867188 C 11.46875 17.964844 11.328125 18.015625 11.121094 18.015625 C 10.808594 18.015625 10.660156 17.890625 10.660156 17.644531 C 10.660156 17.496094 10.691406 17.394531 10.761719 17.339844 C 10.828125 17.28125 10.957031 17.253906 11.132812 17.253906 C 11.351562 17.253906 11.476562 17.296875 11.519531 17.382812 L 11.523438 17.382812 L 11.523438 17.230469 C 11.523438 17.089844 11.507812 17 11.46875 16.957031 C 11.425781 16.914062 11.347656 16.898438 11.214844 16.898438 C 10.996094 16.898438 10.882812 16.957031 10.882812 17.082031 C 10.886719 17.089844 10.886719 17.097656 10.886719 17.117188 Z M 11.175781 17.394531 C 11.039062 17.394531 10.949219 17.40625 10.910156 17.4375 C 10.867188 17.464844 10.847656 17.527344 10.847656 17.621094 C 10.847656 17.726562 10.867188 17.785156 10.910156 17.820312 C 10.945312 17.851562 11.03125 17.867188 11.15625 17.867188 C 11.40625 17.867188 11.535156 17.792969 11.535156 17.636719 C 11.535156 17.542969 11.511719 17.476562 11.464844 17.441406 C 11.414062 17.410156 11.316406 17.394531 11.175781 17.394531 Z M 12.863281 16.773438 L 13.042969 16.773438 L 13.023438 16.914062 L 13.027344 16.921875 C 13.097656 16.808594 13.214844 16.746094 13.382812 16.746094 C 13.609375 16.746094 13.71875 16.863281 13.71875 17.09375 L 13.714844 17.179688 L 13.542969 17.179688 L 13.542969 17.152344 C 13.546875 17.117188 13.546875 17.09375 13.546875 17.085938 C 13.546875 16.957031 13.480469 16.898438 13.34375 16.898438 C 13.140625 16.898438 13.042969 17.019531 13.042969 17.265625 L 13.042969 18 L 12.863281 18 Z M 15.546875 17.632812 L 15.730469 17.632812 L 15.730469 17.671875 C 15.730469 17.800781 15.695312 17.890625 15.617188 17.941406 C 15.539062 17.988281 15.40625 18.015625 15.214844 18.015625 C 14.988281 18.015625 14.839844 17.976562 14.769531 17.894531 C 14.699219 17.808594 14.664062 17.636719 14.664062 17.375 C 14.664062 17.132812 14.699219 16.96875 14.769531 16.882812 C 14.839844 16.796875 14.976562 16.761719 15.183594 16.761719 C 15.410156 16.761719 15.558594 16.792969 15.628906 16.867188 C 15.699219 16.9375 15.730469 17.09375 15.730469 17.324219 L 15.730469 17.417969 L 14.855469 17.417969 C 14.855469 17.613281 14.875 17.734375 14.914062 17.785156 C 14.953125 17.84375 15.054688 17.867188 15.203125 17.867188 C 15.351562 17.867188 15.445312 17.851562 15.488281 17.828125 C 15.527344 17.804688 15.546875 17.75 15.546875 17.664062 Z M 15.546875 17.28125 L 15.546875 17.222656 C 15.546875 17.09375 15.523438 17.003906 15.480469 16.96875 C 15.441406 16.925781 15.34375 16.90625 15.203125 16.90625 C 15.058594 16.90625 14.964844 16.929688 14.921875 16.976562 C 14.878906 17.023438 14.855469 17.121094 14.855469 17.28125 Z M 16.144531 16.863281 L 16.144531 16.363281 L 16.390625 16.363281 C 16.488281 16.363281 16.542969 16.414062 16.542969 16.511719 C 16.542969 16.582031 16.519531 16.625 16.476562 16.640625 C 16.511719 16.65625 16.535156 16.6875 16.535156 16.734375 L 16.535156 16.863281 L 16.472656 16.863281 L 16.472656 16.75 C 16.472656 16.695312 16.449219 16.671875 16.394531 16.671875 L 16.210938 16.671875 L 16.210938 16.863281 Z M 16.210938 16.609375 L 16.371094 16.609375 C 16.441406 16.609375 16.476562 16.582031 16.476562 16.523438 C 16.476562 16.480469 16.472656 16.457031 16.460938 16.445312 C 16.453125 16.429688 16.429688 16.425781 16.390625 16.425781 L 16.210938 16.425781 Z M 16.34375 16.175781 C 16.464844 16.175781 16.570312 16.21875 16.660156 16.304688 C 16.746094 16.390625 16.785156 16.496094 16.785156 16.617188 C 16.785156 16.742188 16.746094 16.84375 16.660156 16.933594 C 16.570312 17.019531 16.464844 17.066406 16.34375 17.066406 C 16.222656 17.066406 16.117188 17.023438 16.027344 16.933594 C 15.945312 16.851562 15.902344 16.742188 15.902344 16.617188 C 15.902344 16.496094 15.945312 16.394531 16.027344 16.304688 C 16.117188 16.21875 16.222656 16.175781 16.34375 16.175781 L 16.34375 16.222656 C 16.234375 16.222656 16.144531 16.261719 16.066406 16.335938 C 15.992188 16.410156 15.953125 16.511719 15.953125 16.617188 C 15.953125 16.730469 15.992188 16.824219 16.066406 16.902344 C 16.144531 16.980469 16.234375 17.019531 16.34375 17.019531 C 16.453125 17.019531 16.542969 16.980469 16.617188 16.902344 C 16.699219 16.824219 16.734375 16.730469 16.734375 16.617188 C 16.734375 16.511719 16.699219 16.417969 16.621094 16.335938 C 16.546875 16.261719 16.453125 16.222656 16.34375 16.222656 Z M 20.09375 16.773438 L 20.09375 18.078125 C 20.09375 18.253906 20.054688 18.375 19.976562 18.441406 C 19.898438 18.507812 19.757812 18.539062 19.554688 18.539062 C 19.371094 18.539062 19.25 18.511719 19.183594 18.460938 C 19.117188 18.398438 19.085938 18.296875 19.085938 18.140625 L 19.253906 18.140625 C 19.253906 18.25 19.273438 18.3125 19.3125 18.347656 C 19.355469 18.375 19.4375 18.394531 19.570312 18.394531 C 19.707031 18.394531 19.796875 18.375 19.84375 18.332031 C 19.890625 18.289062 19.914062 18.210938 19.914062 18.09375 L 19.914062 17.847656 L 19.910156 17.847656 C 19.863281 17.960938 19.730469 18.019531 19.515625 18.019531 C 19.332031 18.019531 19.207031 17.96875 19.136719 17.882812 C 19.070312 17.796875 19.039062 17.632812 19.039062 17.394531 C 19.039062 17.152344 19.070312 16.980469 19.140625 16.890625 C 19.207031 16.800781 19.335938 16.761719 19.523438 16.761719 C 19.726562 16.761719 19.859375 16.820312 19.917969 16.945312 L 19.921875 16.9375 L 19.914062 16.773438 Z M 19.5625 16.90625 C 19.417969 16.90625 19.328125 16.933594 19.289062 16.996094 C 19.246094 17.050781 19.226562 17.183594 19.226562 17.386719 C 19.226562 17.589844 19.246094 17.714844 19.289062 17.777344 C 19.328125 17.839844 19.417969 17.867188 19.5625 17.867188 C 19.703125 17.867188 19.796875 17.832031 19.84375 17.769531 C 19.886719 17.703125 19.90625 17.566406 19.90625 17.359375 C 19.910156 17.167969 19.886719 17.050781 19.84375 16.996094 C 19.796875 16.933594 19.703125 16.90625 19.5625 16.90625 Z M 21.214844 18 L 21.214844 16.25 L 21.394531 16.25 L 21.394531 16.933594 L 21.398438 16.933594 C 21.441406 16.816406 21.570312 16.761719 21.796875 16.761719 C 21.976562 16.761719 22.105469 16.808594 22.171875 16.898438 C 22.234375 16.992188 22.273438 17.160156 22.273438 17.402344 C 22.273438 17.636719 22.234375 17.796875 22.164062 17.882812 C 22.089844 17.96875 21.964844 18.019531 21.773438 18.019531 C 21.582031 18.019531 21.453125 17.960938 21.386719 17.847656 L 21.382812 17.847656 L 21.394531 18 Z M 21.753906 16.90625 C 21.613281 16.90625 21.519531 16.933594 21.472656 16.996094 C 21.425781 17.058594 21.398438 17.175781 21.398438 17.351562 C 21.398438 17.574219 21.421875 17.714844 21.464844 17.777344 C 21.507812 17.839844 21.605469 17.867188 21.761719 17.867188 C 21.890625 17.867188 21.976562 17.832031 22.019531 17.777344 C 22.0625 17.710938 22.085938 17.589844 22.085938 17.394531 C 22.085938 17.195312 22.0625 17.0625 22.019531 17 C 21.976562 16.9375 21.890625 16.90625 21.753906 16.90625 Z M 23.378906 16.773438 L 23.558594 16.773438 L 23.539062 16.914062 L 23.546875 16.921875 C 23.617188 16.808594 23.734375 16.746094 23.898438 16.746094 C 24.121094 16.746094 24.234375 16.863281 24.234375 17.09375 L 24.234375 17.179688 L 24.058594 17.179688 L 24.058594 17.152344 C 24.0625 17.117188 24.0625 17.09375 24.0625 17.085938 C 24.0625 16.957031 23.996094 16.898438 23.855469 16.898438 C 23.660156 16.898438 23.558594 17.019531 23.558594 17.265625 L 23.558594 18 L 23.378906 18 Z M 1.214844 8.328125 L 6.539062 8.328125 L 3.410156 13.796875 L 6.367188 13.796875 L 6.367188 15.277344 L 0.730469 15.277344 L 3.871094 9.792969 L 1.214844 9.792969 Z M 1.214844 8.328125 " />
      <path d="M 13.578125 12.304688 L 7.964844 12.304688 C 8.054688 12.804688 8.265625 13.195312 8.621094 13.480469 C 8.972656 13.769531 9.414062 13.914062 9.964844 13.914062 C 10.621094 13.914062 11.171875 13.695312 11.644531 13.230469 L 13.117188 13.929688 C 12.753906 14.453125 12.308594 14.828125 11.796875 15.078125 C 11.289062 15.328125 10.6875 15.460938 9.980469 15.460938 C 8.878906 15.460938 8.003906 15.105469 7.308594 14.421875 C 6.632812 13.730469 6.289062 12.871094 6.289062 11.832031 C 6.289062 10.773438 6.632812 9.898438 7.308594 9.191406 C 7.992188 8.5 8.855469 8.144531 9.878906 8.144531 C 10.972656 8.144531 11.863281 8.5 12.558594 9.191406 C 13.234375 9.898438 13.578125 10.824219 13.578125 11.964844 Z M 11.820312 10.929688 C 11.703125 10.539062 11.484375 10.222656 11.144531 9.988281 C 10.804688 9.742188 10.410156 9.625 9.964844 9.625 C 9.480469 9.625 9.054688 9.75 8.683594 10.03125 C 8.464844 10.199219 8.238281 10.5 8.042969 10.929688 Z M 14.414062 5.761719 L 16.140625 5.761719 L 16.140625 8.328125 L 17.171875 8.328125 L 17.171875 9.816406 L 16.140625 9.816406 L 16.140625 15.277344 L 14.414062 15.277344 L 14.414062 9.816406 L 13.511719 9.816406 L 13.511719 8.328125 L 14.414062 8.328125 Z M 22.472656 8.328125 L 24.214844 8.328125 L 24.214844 15.277344 L 22.472656 15.277344 L 22.472656 14.542969 C 22.132812 14.871094 21.792969 15.09375 21.453125 15.234375 C 21.101562 15.378906 20.734375 15.460938 20.328125 15.460938 C 19.4375 15.460938 18.652344 15.105469 17.996094 14.410156 C 17.347656 13.71875 17.015625 12.839844 17.015625 11.808594 C 17.015625 10.734375 17.332031 9.859375 17.972656 9.175781 C 18.601562 8.484375 19.371094 8.144531 20.289062 8.144531 C 20.695312 8.144531 21.085938 8.21875 21.453125 8.378906 C 21.820312 8.535156 22.160156 8.773438 22.472656 9.085938 Z M 20.644531 9.75 C 20.105469 9.75 19.644531 9.949219 19.292969 10.332031 C 18.9375 10.707031 18.761719 11.191406 18.761719 11.796875 C 18.761719 12.398438 18.9375 12.878906 19.304688 13.273438 C 19.660156 13.664062 20.117188 13.863281 20.644531 13.863281 C 21.191406 13.863281 21.648438 13.664062 22.015625 13.285156 C 22.382812 12.90625 22.550781 12.40625 22.550781 11.78125 C 22.550781 11.179688 22.382812 10.695312 22.015625 10.316406 C 21.648438 9.933594 21.191406 9.75 20.644531 9.75 Z M 20.644531 9.75 " />
    </SvgIcon>
  )
}

export default Header
