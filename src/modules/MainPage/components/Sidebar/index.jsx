import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PropTypes } from 'prop-types'

import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { List, ListItem } from '@material-ui/core'
import useStyles from './styles'

import { RUN_FILTER } from '../../../../actions/index'
import { loadTags } from '../../../../actions/thunkActions'

const CHIP_MAX_WIDTH = 70

const ChipText = props => {
  ChipText.propTypes = {
    children: PropTypes.string.isRequired,
  }
  const { children } = props

  return (
    <div
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: CHIP_MAX_WIDTH,
      }}
    >
      {children}
    </div>
  )
}

const Sidebar = () => {
  const classes = useStyles()

  const selectedValues = useSelector(state => state.selectedValues)
  const chipData = useSelector(state => state.tags)
  const dispatch = useDispatch()

  const handleClick = clickedValue => {
    if (selectedValues.find(e => e === clickedValue)) {
      const index = selectedValues.findIndex(e => e === clickedValue)
      const arr = [...selectedValues]
      arr.splice(index, 1)
      dispatch({
        type: RUN_FILTER,
        payload: arr,
      })
    } else {
      const arr = [...selectedValues]
      arr.push(clickedValue)
      dispatch({
        type: RUN_FILTER,
        payload: arr,
      })
    }
  }

  useEffect(async () => {
    dispatch(loadTags())
  }, [])

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom className={classes.heading}>
        Choose some tags
      </Typography>
      <List className={classes.content}>
        {chipData.map(data => (
          <ListItem key={data.id} className={classes.chipLi}>
            <Chip
              label={<ChipText>{data.label}</ChipText>}
              className={classes.chip}
              color="primary"
              variant={
                selectedValues.find(e => e === data) ? 'default' : 'outlined'
              }
              onClick={() => handleClick(data)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default Sidebar
