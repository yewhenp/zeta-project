import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Divider } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import PostOverview from '../PostOverview'
import useStyles from './styles'

const MainPage = () => {
  const classes = useStyles()
  const selectedValues = useSelector(state => state.selectedValues)

  // will be used by requesting data from backend
  // eslint-disable-next-line no-unused-vars
  const [postData, updatePostData] = useState([
    {
      id: 0,
      heading:
        'How to scrape a data from a dynamic website containing Javascript using Python?',
      text:
        ' am trying to scrape data from https://www.doordash.com/food-delivery/chicago-il-restaurants/ The idea is to scrape all the data regarding the different restaurant listings on the website.',
      tags: [
        { id: 0, label: 'Angular' },
        { id: 3, label: 'React' },
        { id: 4, label: 'Vue.js' },
      ],
      votes: 100,
      answers: 2,
      views: 1637,
      icon:
        'https://i.pinimg.com/736x/67/5f/34/675f34b5fd6bcdf14e93f507e76e6ec4.jpg',
      username: 'Anton Antonov',
      userrating: 1000,
    },
    {
      id: 1,
      heading: 'Type error:argument of type of type is not iterable',
      text:
        '#please give correct code class unique: dict = {} def __init__(self,sen): self.sen=sen def u(self): for i in self.sen.split():',
      tags: [{ id: 5, label: 'StepanJS The Best Framework Ever' }],
      votes: -23,
      answers: 5,
      views: 16,
      icon: '',
      username: 'Serhiy Serhiiv',
      userrating: 3000,
    },
    {
      id: 2,
      heading:
        'How do I set a value using Mockito to my private final String variable preset in class',
      text:
        'Here is explained in details. I have below one field in my class and I need to change this filed value. I need to change it to 100 while running test case using Mockito or PowerMockito.',
      tags: [{ id: 3, label: 'React' }],
      votes: 2,
      answers: 0,
      views: 88,
      icon: 'https://data.whicdn.com/images/341606254/original.jpg',
      username: 'Makar Makarov',
      userrating: 6000,
    },
  ])

  const includedInSelected = tags => {
    let containAllTags = true
    selectedValues.forEach(elem => {
      let subContainSomeTag = false
      tags.forEach(el => {
        if (el.id === elem.id) {
          subContainSomeTag = true
        }
      })
      if (subContainSomeTag === false) {
        containAllTags = false
      }
    })
    return containAllTags
  }

  return (
    <div className={classes.root}>
      <List>
        {postData.map(
          data =>
            (selectedValues.length === 0 || includedInSelected(data.tags)) && (
              <div key={data.id}>
                <ListItem className={classes.postItem}>
                  <PostOverview
                    postId={data.id}
                    postHeading={data.heading}
                    postText={data.text}
                    postTags={data.tags}
                    postIcon={data.icon}
                    postViews={data.views}
                    postAnswers={data.answers}
                    postVotes={data.votes}
                    userName={data.username}
                    userRating={data.userrating}
                  />
                </ListItem>
                <Divider />
              </div>
            ),
        )}
      </List>
    </div>
  )
}

export default MainPage
