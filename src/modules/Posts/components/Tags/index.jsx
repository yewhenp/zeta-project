import Chip from '@material-ui/core/Chip'
import { ListItem } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import useStyles from './styles'

const Tags = ({ tags }) => {
  Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }

  const classes = useStyles()
  const content = tags.map(data => (
    <ListItem key={data.id} className={classes.chipLi}>
      <Chip
        clickable
        color="primary"
        variant="outlined"
        label={data.label}
        className={classes.chip}
      />
    </ListItem>
  ))

  return (
    <ScrollMenu
      data={content}
      alignCenter
      clickWhenDrag
      dragging
      hideArrows
      hideSingleArrow
      translate={-1}
      transition={0.3}
      wheel
      arrowLeft={<NavigateBeforeIcon />}
      arrowRight={<NavigateNextIcon />}
    />
  )
}

export default Tags
