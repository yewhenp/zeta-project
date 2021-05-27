import { Grid, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { PropTypes } from 'prop-types'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import useStyles from './styles'

const User = ({ nickname, avatarIcon, userRating }) => {
  User.propTypes = {
    nickname: PropTypes.string.isRequired,
    avatarIcon: PropTypes.string.isRequired,
    userRating: PropTypes.number.isRequired,
  }
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs="auto">
        <Avatar alt="User" src={avatarIcon} className={classes.jojoIcon} />
      </Grid>
      <Grid item xs>
        <Typography variant="subtitle2">{nickname}</Typography>
        <div className={classes.chipContent}>
          <StarOutlineIcon fontSize="small" />
          <Typography variant="subtitle2" className={classes.typographyBlock}>
            {userRating}
          </Typography>
        </div>
      </Grid>
    </Grid>
  )
}

export default User
