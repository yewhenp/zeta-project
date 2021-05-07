import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

// icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

import useStyles from './styles'

const Votes = () => {
  const classes = useStyles()

  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical outlined primary button group"
    >
      <IconButton
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        <ArrowDropUpIcon fontSize="large" />
      </IconButton>
      <Button size="small" disableRipple className={classes.count}>
        25
      </Button>
      <IconButton
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        <ArrowDropDownIcon fontSize="large" />
      </IconButton>
    </ButtonGroup>
  )
}

export default Votes
