import React, { forwardRef, useImperativeHandle } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
// import TextField from '@material-ui/core/TextField'

// dialog related stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

// Form related stuff
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'

import useStyles from './styles'

const RegisterForm = forwardRef((props, ref) => {
  const [formState, setFormState] = React.useState({
    open: false,

    username: '',
    usernameError: false,
    usernameLabel: 'Username',

    email: '',
    emailError: false,
    emailLabel: 'Email',

    password: '',
    passwordError: false,
    passwordLabel: 'Password',

    password2: '',
    passwordError2: false,
    passwordLabel2: 'Repeat password',
  })

  const classes = useStyles()

  // text handlers
  const handleChangeUsername = event => {
    setFormState({
      ...formState,
      username: event.target.value,
      usernameError: false,
      usernameLabel: 'Uusername',
    })
  }

  const handleChangeEmail = event => {
    setFormState({
      ...formState,
      email: event.target.value,
      emailError: false,
      emailLabel: 'Email',
    })
  }

  const handleChangePassword = type => {
    if (type === 1) {
      return event => {
        setFormState({
          ...formState,
          password: event.target.value,
          passwordError: false,
          passwordLabel: 'Password',
        })
      }
    }
    return event => {
      setFormState({
        ...formState,
        password2: event.target.value,
        passwordError2: false,
        passwordLabel2: 'Repeat password',
      })
    }
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
  const handleOnClickRegister = () => {
    if (formState.email && formState.password && formState.username) {
      if (formState.password !== formState.password2) {
        setFormState({
          ...formState,
          passwordError: true,
          passwordError2: true,
          passwordLabel: "Passwords don't match",
          passwordLabel2: "Passwords don't match",
        })
      } else {
        // eslint-disable-next-line react/prop-types
        props.loginHandle()
        setFormState({
          ...formState,
          open: false,
          password: '',
          email: '',
        })
      }
    } else {
      if (!formState.username) {
        setFormState(prevState => ({
          ...prevState,
          usernameError: true,
          usernameLabel: "Username can't be empty!",
        }))
      }
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
    }
  }

  return (
    <form>
      <Dialog
        open={formState.open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xs"
      >
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.inputForm}
                error={formState.usernameError}
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
                  onChange={handleChangePassword(1)}
                  label={formState.passwordLabel}
                  type="password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.inputForm}
                error={formState.passwordError2}
              >
                <InputLabel htmlFor="password2-component-outlined">
                  {formState.passwordLabel2}
                </InputLabel>
                <OutlinedInput
                  id="password2-component-outlined"
                  value={formState.password2}
                  onChange={handleChangePassword(2)}
                  label={formState.passwordLabel2}
                  type="password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"
                onClick={handleOnClickRegister}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </form>
  )
})

export default RegisterForm
