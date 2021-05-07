import { Grid } from '@material-ui/core'
import Votes from '../Votes'
import User from '../User'

import useStyles from './styles'

const Sidebar = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <Votes />
      </Grid>
      <Grid item xs={12}>
        <User />
      </Grid>
    </Grid>
  )
}
export default Sidebar
