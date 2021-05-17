import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import styles from './styles'

const updateColor = votes => {
  if (votes > 50) return 'green'
  else if (votes > 20) return 'orange'
  else if (votes > -1) return 'grey'
  return 'red'
}

const Votes = props => {
  const {
    count: [count, setCount],
  } = {
    count: useState(0),
    ...(props.state || {}),
  }
  styles.count.color = updateColor(count)
  const classes = makeStyles(styles)()

  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical outlined primary button group"
    >
      <IconButton
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => setCount(count + 1)}
      >
        <i className={classes.upVote} />
      </IconButton>
      <Button
        size="small"
        variant="text"
        disableTouchRipple
        className={classes.count}
      >
        {count}
      </Button>
      <IconButton
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => setCount(count - 1)}
      >
        <i className={classes.downVote} />
      </IconButton>
    </ButtonGroup>
  )
}

export default Votes
