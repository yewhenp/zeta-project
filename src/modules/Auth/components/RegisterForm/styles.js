import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputForm: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}))

export default useStyles
