import { useState, useImperativeHandle, forwardRef } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import PostOverview from '../PostOverview'
import useStyles from './styles'

const MainPage = forwardRef((props, ref) => {
  const classes = useStyles()
  const [postData, updatePostData] = useState([
    {
      id: 0,
      heading: 'Post 0',
      text: 'some interesting pots 0',
      tags: [
        { id: 0, label: 'Angular' },
        { id: 3, label: 'React' },
        { id: 4, label: 'Vue.js' },
      ],
      icon:
        'https://i.pinimg.com/736x/67/5f/34/675f34b5fd6bcdf14e93f507e76e6ec4.jpg',
      show: true,
    },
    {
      id: 1,
      heading: 'Post 1',
      text: 'some interesting pots 1',
      tags: [{ id: 5, label: 'StepanJS The Best Framework Ever' }],
      icon: '',
      show: true,
    },
    {
      id: 2,
      heading: 'Post 2',
      text: 'some interesting pots 2',
      tags: [{ id: 3, label: 'React' }],
      icon: 'https://data.whicdn.com/images/341606254/original.jpg',
      show: true,
    },
  ])

  useImperativeHandle(ref, () => ({
    filterPosts(tagArr) {
      const arr = [...postData]
      if (tagArr.length === 0) {
        arr.forEach(element => {
          // eslint-disable-next-line no-param-reassign
          element.show = true
        })
      } else {
        arr.forEach(element => {
          let vall = false
          for (let i = 0; i < tagArr.length; i += 1) {
            for (let j = 0; j < element.tags.length; j += 1) {
              if (tagArr[i] === element.tags[j].label) {
                vall = true
              }
            }
          }
          // eslint-disable-next-line no-param-reassign
          element.show = vall
        })
      }

      updatePostData(arr)
    },
  }))

  return (
    <List className={classes.root}>
      {postData.map(
        data =>
          data.show && (
            <ListItem key={data.id} role={undefined} dense>
              <PostOverview
                postHeading={data.heading}
                postText={data.text}
                postTags={data.tags}
                postIcon={data.icon}
              />
            </ListItem>
          ),
      )}
    </List>
  )
})

export default MainPage
