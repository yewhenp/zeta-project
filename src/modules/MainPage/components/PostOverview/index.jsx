import { Grid, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { PropTypes } from 'prop-types'
import useStyles from './styles'

const PostOverview = ({ postHeading, postText, postTags, postIcon }) => {
  PostOverview.propTypes = {
    postHeading: PropTypes.string.isRequired,
    postText: PropTypes.string.isRequired,
    postTags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
    postIcon: PropTypes.string.isRequired,
  }

  const classes = useStyles()

  return (
    <Paper className={classes.container}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={7}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={1}>
              <Avatar alt="User" src={postIcon} className={classes.jojoIcon} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="h5" className={classes.textElement}>
                {postHeading}
              </Typography>
              <Typography variant="subtitle1" className={classes.textElement}>
                {postText}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <List className={classes.chipContent}>
            {postTags.map(tag => (
              <ListItem
                key={tag.id}
                role={undefined}
                dense
                className={classes.chipLi}
              >
                <Chip label={tag.label} className={classes.chip} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PostOverview
