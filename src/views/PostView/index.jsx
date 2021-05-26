import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../modules/Header/components/Header'
import Post from '../../modules/Posts/components/Post'
import Comment from '../../modules/Posts/components/Comment'
/// eslint-disable-next-line no-unused-vars (for better times)

const useStyles = makeStyles({
  element: {
    paddingTop: '10px',
  },
})

const PostView = () => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const classes = useStyles()
  const { ID } = useParams()

  const [postData, updatePostData] = useState({
    id: ID,
    title: '',
    content: '',
    timeCreated: '1-1-1',
    timeLastActive: '1-1-1',
    views: 1,
    author: {
      nickname: '',
      avatarIcon: '',
      userRating: 0,
    },
    votes: 0,
    tags: [],
  })
  const [commentsData, updateCommentsData] = useState([])
  useEffect(async () => {
    const { response } = await (await fetch(`${BASE_API}/posts/${ID}`)).json()
    updatePostData(response)
    const comments = (
      await Promise.all(
        response.comments.map(async id =>
          (await fetch(`${BASE_API}/comments/${id}`)).json(),
        ),
      )
    ).map(value => value.response)
    comments.sort((a, b) => b.votes - a.votes)
    updateCommentsData(comments)
  }, [])
  const updateVotes = count => {
    updatePostData({ ...postData, votes: count })
    fetch(`${BASE_API}/posts/${ID}?votes=${count}`)
  }
  const updateContent = text => updatePostData({ ...postData, content: text })
  const updateCommentVotes = index => count => {
    const newCommentsData = [...commentsData]
    newCommentsData[index] = { ...newCommentsData[index], votes: count }
    newCommentsData.sort((a, b) => b.votes - a.votes)
    updateCommentsData(newCommentsData)
    fetch(`${BASE_API}/comments/${newCommentsData[index].id}?votes=${count}`)
  }
  const updateCommentContent = index => text => {
    const newCommentsData = [...commentsData]
    newCommentsData[index] = { ...newCommentsData[index], content: text }
    updateCommentsData(newCommentsData)
  }

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
          <Post
            postData={postData}
            votesCount={[postData.votes, updateVotes]}
            postContent={[postData.content, updateContent]}
          />
        </Grid>
        {commentsData.map((data, id) => (
          <Grid key={data.id} item xs={8} className={classes.element}>
            <Comment
              commentData={data}
              votesCount={[commentsData[id].votes, updateCommentVotes(id)]}
              commentContent={[
                commentsData[id].content,
                updateCommentContent(id),
              ]}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default PostView
