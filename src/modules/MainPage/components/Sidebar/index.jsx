import { useState } from 'react'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { List, ListItem } from '@material-ui/core'
import useStyles from './styles'

// eslint-disable-next-line react/prop-types
const Sidebar = ({ updateFilter }) => {
  const classes = useStyles()
  const chipData = [
    { id: 0, label: 'Angular' },
    { id: 1, label: 'jQuery' },
    { id: 2, label: 'Polymer' },
    { id: 3, label: 'React' },
    { id: 4, label: 'Vue.js' },
    { id: 5, label: 'StepanJS The Best Framework Ever' },
  ]
  const [selectedValues, updateSelectedValues] = useState([])

  const handleClick = clickedValue => {
    if (selectedValues.find(e => e === clickedValue)) {
      const index = selectedValues.findIndex(e => e === clickedValue)
      const arr = [...selectedValues]
      arr.splice(index, 1)
      updateSelectedValues(arr)
      updateFilter(arr)
    } else {
      const arr = [...selectedValues]
      arr.push(clickedValue)
      updateSelectedValues(arr)
      updateFilter(arr)
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
              label={data.label}
              className={classes.chip}
              color="primary"
              variant={
                selectedValues.find(e => e === data.label)
                  ? 'default'
                  : 'outlined'
              }
              onClick={() => handleClick(data.label)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default Sidebar
