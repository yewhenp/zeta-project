import { Grid } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import BookmarksIcon from '@material-ui/icons/Bookmarks'
import HistoryIcon from '@material-ui/icons/History'
import Votes from '../Votes'

import useStyles from './styles'

const Sidebar = ({ id }) => {
  const classes = useStyles()
  Sidebar.propTypes = {
    id: PropTypes.number.isRequired,
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={12}>
        <Votes id={id} />
      </Grid>
      <Grid item xs={12}>
        <BookmarksIcon htmlColor="#cecece" />
      </Grid>
      <Grid item xs={12}>
        <HistoryIcon htmlColor="#cecece" />
      </Grid>
    </Grid>
  )
}
export default Sidebar
