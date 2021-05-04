import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import PostOverview from '../PostOverview'
import useStyles from './styles'

const MainPage = () => {
  const classes = useStyles()
  const postData = [
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
    },
    {
      id: 1,
      heading: 'Post 1',
      text: 'some interesting pots 1',
      tags: [{ id: 5, label: 'StepanJS The Best Framework Eve' }],
      icon: '',
    },
    {
      id: 2,
      heading: 'Post 2',
      text: 'some interesting pots 2',
      tags: [{ id: 3, label: 'React' }],
      icon: 'https://data.whicdn.com/images/341606254/original.jpg',
    },
  ]

  return (
    <List className={classes.root}>
      {postData.map(data => (
        <ListItem key={data.id} role={undefined} dense>
          <PostOverview
            postHeading={data.heading}
            postText={data.text}
            postTags={data.tags}
            postIcon={data.icon}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default MainPage
