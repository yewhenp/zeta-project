import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../modules/Header/components/Header'
import Post from '../../modules/Posts/components/Post'
import Comment from '../../modules/Posts/components/Comment'

const text = `
###Explanation
Paracetamol is metabolized in the liver.

In the setting of acute overdose, **liver conjugation** (Phase 2 reaction) **is overloaded** leading to paracetamol being metabolized by an alternative pathway.

This alternative pathway leads to a toxic- metabolite: **NAPQI** (N-acetyl-p-benzoquinone imine).

This is usually **inactivated by glutathione**.

If the paracetamol overdose is severe, glutathione is depleted leading to accumulation of NAPQI and subsquent necrosis of liver and kidney tissue.

*Acetaminophen* is another name for *paracetamol*. 

Glucoronyl is an example of a chemical group added onto a drug during conjugation.

N-acetyl cysteine is used to treat paracetamol overdose to replenish glutathione levels.
`
const useStyles = makeStyles({
  element: {
    paddingTop: '10px',
  },
})

const PostView = () => {
  const classes = useStyles()

  const { ID } = useParams()

  // will be used by requesting data from backend
  // eslint-disable-next-line no-unused-vars
  const [postData, updatePostData] = useState({
    id: ID,
    title: 'What is a NullPointerException, and how do I fix it?',
    content: text,
    timeCreated: '2008-10-20',
    timeLastActive: '2021-04-25',
    views: 3298407,
    author: {
      nickname: 'Anton Antonov',
      avatarIcon: 'https://data.whicdn.com/images/341606254/original.jpg',
      userRating: 4000,
    },
    votes: 10,
    tags: [
      { id: 0, label: 'Angular' },
      { id: 1, label: 'jQuery' },
      { id: 2, label: 'Polymer' },
      { id: 3, label: 'React' },
      { id: 4, label: 'Vue.js' },
      { id: 5, label: 'StepanJS The Best Framework Ever' },
      { id: 6, label: 'JavaScrip' },
      { id: 7, label: 'C++' },
      { id: 8, label: 'Python' },
    ],
  })

  // will be used by requesting data from backend
  // eslint-disable-next-line no-unused-vars
  const [commentsData, updateCommentsData] = useState([
    {
      id: ID + 1,
      title: 'What is a NullPointerException, and how do I fix it?',
      content: text,
      timeCreated: '2008-10-20',
      timeLastActive: '2021-04-25',
      views: 3298407,
      author: {
        nickname: 'Anton Antonov',
        avatarIcon: 'https://data.whicdn.com/images/341606254/original.jpg',
        userRating: 4000,
      },
      votes: 10,
      tags: [
        { id: 0, label: 'Angular' },
        { id: 1, label: 'jQuery' },
        { id: 2, label: 'Polymer' },
        { id: 3, label: 'React' },
        { id: 4, label: 'Vue.js' },
        { id: 5, label: 'StepanJS The Best Framework Ever' },
        { id: 6, label: 'JavaScrip' },
        { id: 7, label: 'C++' },
        { id: 8, label: 'Python' },
      ],
    },
    {
      id: ID + 2,
      title: 'What is a NullPointerException, and how do I fix it?',
      content: text,
      timeCreated: '2008-10-20',
      timeLastActive: '2021-04-25',
      views: 3298407,
      author: {
        nickname: 'Anton Antonov',
        avatarIcon: 'https://data.whicdn.com/images/341606254/original.jpg',
        userRating: 4000,
      },
      votes: 10,
      tags: [
        { id: 0, label: 'Angular' },
        { id: 1, label: 'jQuery' },
        { id: 2, label: 'Polymer' },
        { id: 3, label: 'React' },
        { id: 4, label: 'Vue.js' },
        { id: 5, label: 'StepanJS The Best Framework Ever' },
        { id: 6, label: 'JavaScrip' },
        { id: 7, label: 'C++' },
        { id: 8, label: 'Python' },
      ],
    },
  ])
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
        {commentsData.map(data => (
          <Grid key={data.id} item xs={8} className={classes.element}>
            <Comment commentData={data} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default PostView
