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

const LoginForm = forwardRef((props, ref) => {
  const [formState, setFormState] = React.useState({
    open: false,

    email: '',
    emailError: false,
    emailLabel: 'Email',

    password: '',
    passwordError: false,
    passwordLabel: 'Password',
  })

  const classes = useStyles()

  const handleClose = () => {
    setFormState(prevState => ({
      ...prevState,
      open: false,
    }))
  }

  const handleChangeEmail = event => {
    setFormState(prevState => ({
      ...prevState,
      email: event.target.value,
      emailForm: false,
      emailError: false,
      emailLabel: 'Email',
    }))
  }

  const handleChangePassword = event => {
    setFormState(prevState => ({
      ...prevState,
      password: event.target.value,
      passwordForm: false,
      passwordError: false,
      passwordLabel: 'Password',
    }))
  }

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setFormState(prevState => ({
        ...prevState,
        open: true,
      }))
    },
  }))

  const handleOnClickLogin = () => {
    if (!formState.email) {
      setFormState(prevState => ({
        ...prevState,
        open: true,
        emailError: true,
        emailLabel: 'field is empty!',
      }))
    }
    if (!formState.password) {
      setFormState(prevState => ({
        ...prevState,
        open: true,
        passwordError: true,
        passwordLabel: 'field is empty!',
      }))
    }
    if (formState.password && formState.email) {
      // eslint-disable-next-line react/prop-types
      props.loginHandle()
      setFormState(prevState => ({
        ...prevState,
        open: false,
        password: '',
        email: '',
      }))
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
          </Grid>
        </DialogContent>
      </Dialog>
    </form>
  )
})

export default LoginForm


// import React, { forwardRef, useImperativeHandle } from 'react'
// import Button from '@material-ui/core/Button'
// import Grid from '@material-ui/core/Grid'
// // import TextField from '@material-ui/core/TextField'

// // dialog related stuff
// import Dialog from '@material-ui/core/Dialog'
// import DialogContent from '@material-ui/core/DialogContent'

// // Form related stuff
// import FormControl from '@material-ui/core/FormControl'
// import OutlinedInput from '@material-ui/core/OutlinedInput'
// import InputLabel from '@material-ui/core/InputLabel'

// import useStyles from './styles'

// const LoginForm = forwardRef((props, ref) => {
//   const [open, setOpen] = React.useState(false)
//   const [email, setEmail] = React.useState('')
//   const [emailError, setEmailError] = React.useState(false)
//   const [emailLabel, setEmailLabel] = React.useState('Email')

//   const [password, setPassword] = React.useState('')
//   const [passwordError, setPasswordError] = React.useState('')
//   const [passwordLabel, setPasswordLabel] = React.useState('Password')

//   const classes = useStyles()

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const handleChangeEmail = event => {
//     setEmail(event.target.value)
//     setEmailError(false)
//     setEmailLabel('Email')
//   }

//   const handleChangePassword = event => {
//     setPassword(event.target.value)
//     setPasswordError(false)
//     setPasswordLabel('Password')
//   }

//   useImperativeHandle(ref, () => ({
//     handleClickOpen() {
//       setOpen(true)
//     },
//   }))

//   const handleOnClickLogin = () => {
//     if (!email) {
//       setEmailError(true)
//       setEmailLabel('Email field is empty!')
//     }
//     if (!password) {
//       setPasswordError(true)
//       setPasswordLabel('Password field is empty!')
//     }
//     if (password && email) {
//       // eslint-disable-next-line react/prop-types
//       props.loginHandle()
//       setOpen(false)
//     }
//   }

//   return (
//     <form>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         scroll="paper"
//         aria-labelledby="scroll-dialog-title"
//         aria-describedby="scroll-dialog-description"
//         maxWidth="xs"
//       >
//         <DialogContent dividers>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <FormControl
//                 variant="outlined"
//                 className={classes.inputForm}
//                 error={emailError}
//               >
//                 <InputLabel htmlFor="email-component-outlined">
//                   {emailLabel}
//                 </InputLabel>
//                 <OutlinedInput
//                   id="email-component-outlined"
//                   value={email}
//                   onChange={handleChangeEmail}
//                   label={emailLabel}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl
//                 variant="outlined"
//                 className={classes.inputForm}
//                 error={passwordError}
//               >
//                 <InputLabel htmlFor="password-component-outlined">
//                   {passwordLabel}
//                 </InputLabel>
//                 <OutlinedInput
//                   id="password-component-outlined"
//                   value={password}
//                   onChange={handleChangePassword}
//                   type="password"
//                   label={passwordLabel}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 color="primary"
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 onClick={handleOnClickLogin}
//               >
//                 Log in
//               </Button>
//             </Grid>
//           </Grid>
//         </DialogContent>
//       </Dialog>
//     </form>
//   )
// })

// export default LoginForm
