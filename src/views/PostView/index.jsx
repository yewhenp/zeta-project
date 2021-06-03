import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../modules/Header/components/Header'
import Post from '../../modules/Posts/components/Post'
import Comment from '../../modules/Posts/components/Comment'
import { setUpPostView } from '../../async_actions'
/// eslint-disable-next-line no-unused-vars (for better times)

const useStyles = makeStyles({
  element: {
    paddingTop: '10px',
  },
})

const PostView = () => {
  const classes = useStyles()
  const { ID } = useParams()
  const postData = useSelector(state => state.post)
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()

  // const [postData, updatePostData] = useState({
  //   id: ID,
  //   title: '',
  //   content: '',
  //   timeCreated: '1-1-1',
  //   timeLastActive: '1-1-1',
  //   views: 1,
  //   author: {
  //     nickname: '',
  //     avatarIcon: '',
  //     userRating: 0,
  //   },
  //   votes: 0,
  //   tags: [],
  // })
  // const [commentsData, updateCommentsData] = useState([])

  useEffect(() => {
    dispatch(setUpPostView(ID))
  }, [])
  // const updateVotes = count => {
  //   updatePostData({ ...postData, votes: count })
  //   fetch(`${BASE_API}/posts/${ID}?votes=${count}`)
  // }
  // const updateContent = text => updatePostData({ ...postData, content: text })
  // const updateCommentVotes = index => count => {
  // const newCommentsData = [...commentsData]
  // newCommentsData[index] = { ...newCommentsData[index], votes: count }
  // newCommentsData.sort((a, b) => b.votes - a.votes)
  //   updateCommentsData(newCommentsData)
  //   fetch(`${BASE_API}/comments/${newCommentsData[index].id}?votes=${count}`)
  // }
  // const updateCommentContent = index => text => {
  //   const newCommentsData = [...commentsData]
  //   newCommentsData[index] = { ...newCommentsData[index], content: text }
  //   updateCommentsData(newCommentsData)
  // }
  // console.log(comments)
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
          <Grid key={() => id} item xs={8} className={classes.element}>
            <Comment commentData={comment} id={id} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default PostView
