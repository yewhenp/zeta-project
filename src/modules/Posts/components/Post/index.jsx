import 'react-mde/lib/styles/css/react-mde-all.css'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import { PropTypes } from 'prop-types'
import useStyles from './styles'
import Content from '../Content'

const Post = ({ tags }) => {
  const classes = useStyles()
  Post.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <Divider variant="middle" />
      <CardContent>
        <Content tags={tags} />
      </CardContent>
    </Card>
  )
}

export default Post
