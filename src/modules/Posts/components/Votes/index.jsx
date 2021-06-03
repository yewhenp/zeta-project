import { useDispatch, useSelector } from 'react-redux'
import { PropTypes } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { updateVotes } from '../../../../async_actions'
import styles from './styles'

const updateColor = votes => {
  if (votes > 50) return 'green'
  if (votes > 20) return 'orange'
  if (votes > -1) return 'grey'
  return 'red'
}

const Votes = ({ id }) => {
  Votes.propTypes = {
    id: PropTypes.number,
  }

  Votes.defaultProps = {
    id: null,
  }
  const count = useSelector(state =>
    id != null ? state.comments[id].votes : state.post.votes,
  )
  const dispatch = useDispatch()
  styles.count.color = updateColor(count)
  const classes = makeStyles(styles)()

  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical outlined primary button group"
      variant="text"
    >
      <Button
        color="primary"
        size="medium"
        className={classes.button}
        onClick={() => dispatch(updateVotes(id, count + 1))}
      >
        <i className={classes.upVote} />
      </Button>
      <Button
        size="small"
        variant="text"
        disableTouchRipple
        className={classes.count}
      >
        {count}
      </Button>
      <Button
        color="primary"
        size="medium"
        className={classes.button}
        onClick={() => dispatch(updateVotes(id, count - 1))}
      >
        <i className={classes.downVote} />
      </Button>
    </ButtonGroup>
  )
}

export default Votes
