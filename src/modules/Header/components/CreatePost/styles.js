import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  heading: {
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(4),
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },

  dialogButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: theme.spacing(3),
  },

  inputForm: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
  },

  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export default useStyles
