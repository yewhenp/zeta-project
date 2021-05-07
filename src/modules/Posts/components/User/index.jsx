import { Grid, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'

import useStyles from './styles'

const User = () => {
  const classes = useStyles()

  const postIcon = 'https://data.whicdn.com/images/341606254/original.jpg'
  const userName = 'John Johnson'

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={12}>
        <Avatar alt="User" src={postIcon} className={classes.jojoIcon} />
      </Grid>
      <Typography item xs={12}>
        {userName}
      </Typography>
    </Grid>
  )
}

export default User
