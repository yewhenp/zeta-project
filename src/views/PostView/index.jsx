// import { useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../modules/Header/components/Header'
import Post from '../../modules/Posts/components/Post'
import Comment from '../../modules/Posts/components/Comment'

const useStyles = makeStyles({
  element: {
    height: '100%',
    width: '100%',
  },
})

const PostView = () => {
  const classes = useStyles()
  const tags = [
    { id: 0, label: 'Angular' },
    { id: 1, label: 'jQuery' },
    { id: 2, label: 'Polymer' },
    { id: 3, label: 'React' },
    { id: 4, label: 'Vue.js' },
    { id: 5, label: 'StepanJS The Best Framework Ever' },
  ]
  //   const childRef = useRef()

  return (
    <div className={classes.element}>
      <Grid
        container
        spacing={2}
        // direction="column"
        justify="center"
        alignItems="center"
        className={classes.element}
      >
        <Grid item xs>
          <Header />
        </Grid>
        <Grid
          container
          direction="column"
          spacing={3}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={8} className={classes.element}>
            <Post tags={tags} />
          </Grid>
          <Grid item xs={8} className={classes.element}>
            <Comment />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default PostView
