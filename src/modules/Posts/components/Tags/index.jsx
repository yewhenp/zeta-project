import Chip from '@material-ui/core/Chip'
import { List, ListItem } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import useStyles from './styles'

const Tags = ({ tags }) => {
  Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }

  const classes = useStyles()

  return (
    <List className={classes.content}>
      {tags.map(data => (
        <ListItem key={data.id} className={classes.chipLi}>
          <Chip clickable="true" label={data.label} className={classes.chip} />
        </ListItem>
      ))}
    </List>
  )
}

export default Tags
