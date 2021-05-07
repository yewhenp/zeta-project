import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  gridContainer: {
    direction: 'row',
    justify: 'space-around',
    alignItems: 'center',
  },

  gridItem: {
    padding: 0,
  },
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
  },
  paper: {
    width: '100%',
    height: '100%',
  },

  toolbar: {
    display: 'none !important',
  },
  preview: {
    height: '100%',
  },
}))

export default useStyles
