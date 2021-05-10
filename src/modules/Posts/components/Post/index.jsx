import 'react-mde/lib/styles/css/react-mde-all.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import { PropTypes } from 'prop-types'
import useStyles from './styles'
import Content from '../Content'
import Title from '../Title'

const Post = ({ postData }) => {
  const classes = useStyles()
  Post.propTypes = {
    postData: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      timeCreated: PropTypes.string.isRequired,
      timeLastActive: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      author: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        avatarIcon: PropTypes.string.isRequired,
        userRating: PropTypes.number.isRequired,
      }).isRequired,
      votes: PropTypes.number.isRequired,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }

  return (
    <Card className={classes.container}>
      <Title
        title={postData.title}
        timeCreated={postData.timeCreated}
        timeLastActive={postData.timeLastActive}
        views={postData.views}
      />
      <Divider variant="middle" />
      <CardContent>
        <Content
          content={postData.content}
          tags={postData.tags}
          author={postData.author}
          votes={postData.votes}
        />
      </CardContent>
    </Card>
  )
}

export default Post
