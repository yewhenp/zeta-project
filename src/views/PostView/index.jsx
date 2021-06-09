import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../shared_modules/Header/components/Header'
import Post from '../../modules/Posts/components/Post'
import Comment from '../../modules/Posts/components/Comment'
import { setUpPostView } from '../../async_actions'
/// eslint-disable-next-line no-unused-vars (for better times)

const useStyles = makeStyles({
  element: {
    paddingTop: '10px',
    width: '100%',
  },
})

const PostView = () => {
  const classes = useStyles()
  const { ID } = useParams()
  const postData = useSelector(state => state.post)
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setUpPostView(ID))
  }, [])

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid
        container
        direction="column"
        className={classes.element}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={8} className={classes.element}>
          <Post postData={postData} />
        </Grid>
        {comments.map((comment, id) => (
          <Grid
            key={Math.floor(Math.random() * Date.now())}
            item
            xs={8}
            className={classes.element}
          >
            <Comment commentData={comment} id={id} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default PostView
