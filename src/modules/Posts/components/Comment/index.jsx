import 'react-mde/lib/styles/css/react-mde-all.css'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import useStyles from './styles'
import Content from '../Content'

const Comment = () => {
  const classes = useStyles()

  return (
    <Card className={classes.container}>
      <CardHeader />
      <CardContent>
        <Content tags={[]} />
      </CardContent>
    </Card>
  )
}

export default Comment
