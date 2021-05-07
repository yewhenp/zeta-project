import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  gridContainer: {
    direction: 'row',
    justify: 'space-around',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    padding: theme.spacing(0.5),
  },
  title: {
    textAlign: 'center',
  },
  paper: {
    width: '100%',
    height: '100%',
  },
}))

export default useStyles
