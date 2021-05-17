import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
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
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chipLi: {
    width: 'inherit',
  },
  jojoIcon: {
    // marginLeft: theme.spacing(1),
  },
  textElement: {
    padding: theme.spacing(1),
  },
  numberContainer: {
    // padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  greenContainer: {
    color: '#48a868',
    border: '1px solid transparent',
    borderColor: '#48a868',
    borderRadius: '7px',
  },
  redContainer: {
    color: '#c02d2e',
    border: '1px solid transparent',
    borderColor: '#c02d2e',
    borderRadius: '7px',
  },
  grayContainer: {
    color: '#6a737c',
  },
  orangeTextContainer: {
    color: '#a35200',
  },
  grigFullWigthItem: {
    width: '100%',
  },
  userSection: {
    padding: theme.spacing(0.5),
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typographyBlock: {
    display: 'inline-block',
  },
  spacer: {
    marginTop: theme.spacing(2),
  },
}))

export default useStyles
