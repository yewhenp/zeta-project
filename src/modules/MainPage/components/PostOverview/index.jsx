/* eslint-disable no-unused-vars */
// import { useHistory } from 'react-router-dom'
import { Container, Grid, Typography } from '@material-ui/core'
// import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { PropTypes } from 'prop-types'
import Link from '@material-ui/core/Link'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import useStyles from './styles'

const PostOverview = ({
  postHeading,
  postText,
  postTags,
  postIcon,
  postViews,
  postVotes,
  postAnswers,
  userName,
  userRating,
}) => {
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
    userName: PropTypes.string.isRequired,
    postViews: PropTypes.number.isRequired,
    userRating: PropTypes.number.isRequired,
    postVotes: PropTypes.number.isRequired,
    postAnswers: PropTypes.number.isRequired,
  }

  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={1}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs className={classes.grigFullWigthItem}>
              <Container
                className={`${classes.numberContainer} ${
                  // eslint-disable-next-line no-nested-ternary
                  postVotes > 10
                    ? classes.greenContainer
                    : postVotes > -1
                    ? classes.grayContainer
                    : classes.redContainer
                }`}
              >
                <Typography variant="body2">{postVotes}</Typography>
                <Typography variant="body2">votes</Typography>
              </Container>
            </Grid>
            <Grid item xs className={classes.grigFullWigthItem}>
              <Container
                className={`${classes.numberContainer} ${
                  // eslint-disable-next-line no-nested-ternary
                  postAnswers > 2
                    ? classes.greenContainer
                    : postAnswers > -1
                    ? classes.grayContainer
                    : classes.redContainer
                }`}
              >
                <Typography variant="body2">{postAnswers}</Typography>
                <Typography variant="body2">answ</Typography>
              </Container>
            </Grid>
            <Grid item xs className={classes.grigFullWigthItem}>
              <Container
                className={`${classes.numberContainer} ${
                  // eslint-disable-next-line no-nested-ternary
                  postViews > 100
                    ? classes.orangeTextContainer
                    : postViews > -1
                    ? classes.grayContainer
                    : classes.redContainer
                }`}
              >
                <Typography variant="caption">{postViews}</Typography>
                <Typography variant="caption">views</Typography>
              </Container>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          />
          <Grid item xs className={classes.grigFullWigthItem}>
            <Link href="/post">
              <Typography variant="h6">{postHeading}</Typography>
            </Link>
          </Grid>
          <Grid item xs className={classes.grigFullWigthItem}>
            <Typography variant="body2">{postText}</Typography>
          </Grid>
          <Grid item xs className={classes.grigFullWigthItem}>
            <Grid
              container
              className={`${classes.userSection} ${classes.spacer}`}
            >
              <Grid item xs={9}>
                <List className={classes.chipContent}>
                  {postTags.map(tag => (
                    <ListItem
                      key={tag.id}
                      role={undefined}
                      dense
                      className={classes.chipLi}
                    >
                      <Chip
                        label={tag.label}
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={1.3}>
                    <Avatar
                      alt="User"
                      src={postIcon}
                      className={classes.jojoIcon}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle2">{userName}</Typography>
                    <div className={classes.chipContent}>
                      <StarOutlineIcon fontSize="small" />
                      <Typography
                        variant="subtitle2"
                        className={classes.typographyBlock}
                      >
                        {userRating}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default PostOverview
