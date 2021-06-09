import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

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
  checkBox: {
    color: green[400],
  },
  clickHere: {
    color: green[400],
  },
}))

export default useStyles
