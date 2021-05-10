import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipContent: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chipLi: {
    width: 'inherit',
  },
  jojoIcon: {
    marginLeft: theme.spacing(1),
  },
  textElement: {
    padding: theme.spacing(1),
  },
  typographyBlock: {
    display: 'inline-block',
  },
}))

export default useStyles
