/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
// import TextField from '@material-ui/core/TextField'

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

import useStyles from './styles'
import RegisterForm from '../RegisterForm'

const LoginForm = forwardRef((props, ref) => {
  const [formState, setFormState] = React.useState({
    open: false,

    email: '',
    emailError: false,
    emailLabel: 'Email',

    password: '',
    passwordError: false,
    passwordLabel: 'Password',

    rememberMe: false,
  })

  const classes = useStyles()
  const refForRegister = useRef()

  // text change handlers
  const handleChangeEmail = event => {
    setFormState({
      ...formState,
      email: event.target.value,
      emailError: false,
      emailLabel: 'Email',
    })
  }

  const handleChangePassword = event => {
    setFormState({
      ...formState,
      password: event.target.value,
      passwordError: false,
      passwordLabel: 'Password',
    })
  }

  // close/open handlers
  const handleClose = () => {
    setFormState({ ...formState, open: false })
  }

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setFormState({ ...formState, open: true })
    },
  }))

  // button
  const handleOnClickLogin = () => {
    if (!formState.email) {
      setFormState(prevState => ({
        ...prevState,
        emailError: true,
        emailLabel: "Email can't be empty!",
      }))
    }
    if (!formState.password) {
      setFormState(prevState => ({
        ...prevState,
        passwordError: true,
        passwordLabel: "Password can't be empty!",
      }))
    }
    if (formState.password && formState.email) {
      // eslint-disable-next-line react/prop-types
      props.loginHandle()
      setFormState({
        ...formState,
        open: false,
        password: '',
        email: '',
        rememberMe: false,
      })
    }
  }

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

  return (
    <form>
      <Dialog
        open={formState.open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="login-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="login-title">Log In</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.inputForm}
                error={formState.emailError}
              >
                <InputLabel htmlFor="email-component-outlined">
                  {formState.emailLabel}
                </InputLabel>
                <OutlinedInput
                  id="email-component-outlined"
                  value={formState.email}
                  onChange={handleChangeEmail}
                  label={formState.emailLabel}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.inputForm}
                error={formState.passwordError}
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
                    disabled={!formState.email || !formState.password}
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
      <RegisterForm ref={refForRegister} />
    </form>
  )
})

export default LoginForm
