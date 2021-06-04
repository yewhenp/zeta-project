import { makeStyles } from '@material-ui/core/styles'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  postItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  root: {
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  pagination: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },
}))

export default useStyles
