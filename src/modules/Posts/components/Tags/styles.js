import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipLi: {
    width: 'inherit',
  },
}))

export default useStyles
