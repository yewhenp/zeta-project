import 'react-mde/lib/styles/css/react-mde-all.css'
import { PropTypes } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import useStyles from './styles'
import Content from '../Content'

const Comment = ({ commentData, commentContent, votesCount }) => {
  const classes = useStyles()
  Comment.propTypes = {
    votesCount: PropTypes.arrayOf().isRequired,
    commentContent: PropTypes.arrayOf().isRequired,
    commentData: PropTypes.shape({
      author: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        avatarIcon: PropTypes.string.isRequired,
        userRating: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }

  return (
    <Card className={classes.container}>
      <CardContent>
        <Content
          postContent={commentContent}
          tags={[]}
          author={commentData.author}
          votesCount={votesCount}
        />
      </CardContent>
    </Card>
  )
}

export default Comment
