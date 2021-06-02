import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { List, ListItem } from '@material-ui/core'
import useStyles from './styles'

import { RUN_FILTER } from '../../../../actions/index'

const CHIP_MAX_WIDTH = 70

const ChipText = props => {
  // eslint-disable-next-line react/prop-types
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
  const BASE_API = process.env.REACT_APP_BASE_URL
  const classes = useStyles()

  const selectedValues = useSelector(state => state.selectedValues)
  const dispatch = useDispatch()

  const [chipData, updatechipData] = useState([])
  const getChipData = async () => {
    const resp = await fetch(`${BASE_API}/tags/1`)
    let data = await resp.json()
    data = data.response
    updatechipData(data)
  }
  useEffect(() => {
    getChipData()
  }, [])

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
