import Chip from '@material-ui/core/Chip'
import { ListItem } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { useStyles, scrollMenuStyle } from './styles'

const Tags = ({ tags }) => {
  Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  const classes = useStyles()
  const content = tags.map(label => (
    <ListItem key={label} className={classes.chipLi}>
      <Chip
        clickable
        color="primary"
        variant="outlined"
        label={label}
        className={classes.chip}
      />
    </ListItem>
  ))

  return (
    <ScrollMenu
      data={content}
      alignCenter={false}
      disableTabindex
      dragging
      hideArrows
      hideSingleArrow
      wrapperStyle={scrollMenuStyle}
      transition={0.3}
      wheel
      arrowLeft={<NavigateBeforeIcon />}
      arrowRight={<NavigateNextIcon />}
    />
  )
}

export default Tags
