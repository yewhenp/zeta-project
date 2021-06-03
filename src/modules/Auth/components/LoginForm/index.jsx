/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { PropTypes } from 'prop-types'

import { verify } from 'password-hash'

// dialog related stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

// Form related stuff
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

// my imports
import useStyles from './styles'
import RegisterForm from '../RegisterForm'

const LoginForm = forwardRef((props, ref) => {
  LoginForm.propTypes = {
    loginHandle: PropTypes.func.isRequired,
  }

  const BASE_API = process.env.REACT_APP_BASE_URL
  const defaultState = {
    open: false,

    username: '',
    usernameError: false,
    usernameLabel: 'Username',

    password: '',
    passwordError: false,
    passwordLabel: 'Password',

    rememberMe: false,

    invalidUserNameOrPassword: false,
  }
  const [formState, setFormState] = React.useState(defaultState)

  const classes = useStyles()
  const refForRegister = useRef()

  // text change handlers
  const handleChangeUsername = event => {
    setFormState({
      ...formState,
      username: event.target.value,
      usernameError: false,
      usernameLabel: 'Username',
      invalidUserNameOrPassword: false,
    })
  }

  const handleChangePassword = event => {
    setFormState({
      ...formState,
      password: event.target.value,
      passwordError: false,
      passwordLabel: 'Password',
      invalidUserNameOrPassword: false,
    })
  }

  // close/open handlers
  const handleClose = () => {
    setFormState(defaultState)
  }

  // login button
  const handleOnClickLogin = async () => {
    let updateStateFields = {}
    if (formState.password && formState.username) {
      // retrieve info about user from backend
      const resp = await fetch(`${BASE_API}/users/${formState.username}`)
      const hashed = await resp.json()
      // if password is correct
      if (
        resp.status === 200 &&
        verify(formState.password, hashed.response.hashed)
      ) {
        props.loginHandle(formState.username, hashed.response.id)
        updateStateFields = {
          ...updateStateFields,
          open: false,
          password: '',
          username: '',
        }
      } else {
        updateStateFields = {
          ...updateStateFields,
          invalidUserNameOrPassword: true,
        }
      }
    } else {
      // some fields are empty - error
      updateStateFields = {
        ...updateStateFields,
        usernameError: !formState.username,
        passwordError: !formState.password,
        usernameLabel: !formState.username
          ? "Username can't be empty!"
          : formState.usernameLabel,
        passwordLabel: !formState.password
          ? "Password can't be empty!"
          : formState.passwordLabel,
      }
    }
    setFormState(prevState => ({
      ...prevState,
      ...updateStateFields,
    }))
  }

  // on-click - move to register
  const handleOnClickClickHere = () => {
    setFormState({
      ...formState,
      open: false,
    })
    refForRegister.current.handleClickOpen()
  }

  // checkbox
  const handleCheckBox = event => {
    setFormState(prevState => ({
      ...prevState,
      rememberMe: event.target.checked,
    }))
  }

  // should be called by register form after successfull register to come back to login page
  const handleRegister = () => {
    setFormState(prevState => ({
      ...prevState,
      open: true,
    }))
  }

  // handler for parent to open the dialog login page
  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setFormState({ ...formState, open: true })
    },
  }))

  return (
    <div>
      <form>
        <Dialog
          open={formState.open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="login-title"
          aria-describedby="scroll-dialog-description"
          maxWidth="xs"
        >
          {/* If no error */}
          {(!formState.invalidUserNameOrPassword && (
            <DialogTitle id="login-title"> Log In</DialogTitle>
          )) || (
            <DialogTitle id="login-title">
              Username or password Incorrect
            </DialogTitle>
          )}
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.inputForm}
                  error={
                    formState.usernameError ||
                    formState.invalidUserNameOrPassword
                  }
                >
                  <InputLabel htmlFor="username-component-outlined">
                    {formState.usernameLabel}
                  </InputLabel>
                  <OutlinedInput
                    id="username-component-outlined"
                    value={formState.username}
                    onChange={handleChangeUsername}
                    label={formState.usernameLabel}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.inputForm}
                  error={
                    formState.passwordError ||
                    formState.invalidUserNameOrPassword
                  }
                >
                  <InputLabel htmlFor="password-component-outlined">
                    {formState.passwordLabel}
                  </InputLabel>
                  <OutlinedInput
                    id="password-component-outlined"
                    value={formState.password}
                    onChange={handleChangePassword}
                    type="password"
                    label={formState.passwordLabel}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={!formState.username || !formState.password}
                      checked={formState.rememberMe}
                      onChange={handleCheckBox}
                      name="checkedG"
                      className={classes.checkBox}
                    />
                  }
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  fullWidth
                  type="submit"
                  variant="contained"
                  onClick={handleOnClickLogin}
                >
                  Log in
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  gutterBottom
                  className={classes.heading}
                  align="center"
                >
                  Not registered yet?{' '}
                  <Link
                    className={classes.clickHere}
                    display="inline"
                    variant="body2"
                    href="#"
                    onClick={handleOnClickClickHere}
                  >
                    click here
                  </Link>{' '}
                  to create new account
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </form>
      <RegisterForm ref={refForRegister} registerHandle={handleRegister} />
    </div>
  )
})

export default LoginForm
