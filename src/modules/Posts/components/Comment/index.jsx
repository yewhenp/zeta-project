import 'react-mde/lib/styles/css/react-mde-all.css'
import { PropTypes } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import useStyles from './styles'
import Content from '../Content'

const Comment = ({ commentData, id }) => {
  console.log(commentData)
  console.log(id)
  const classes = useStyles()
  Comment.propTypes = {
    id: PropTypes.number.isRequired,
    commentData: PropTypes.shape({
      content: PropTypes.string.isRequired,
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
          content={commentData.content}
          tags={[]}
          author={commentData.author}
          id={id}
        />
      </CardContent>
    </Card>
  )
}

export default Comment
