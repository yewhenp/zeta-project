import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

// Dialog related stuff
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

// Form related stuff
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'

// my exports
import { createTag } from '../../../../../actions/thunkActions'
import useStyles from './styles'

const CreateTag = forwardRef((props, ref) => {
  const dispatch = useDispatch()

  const defaultState = {
    open: false,
    name: '',
  }

  // State
  const [mystate, setMystate] = useState(defaultState)
  const classes = useStyles()

  const handleClose = () => {
    setMystate({ ...mystate, open: false })
  }

  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (mystate.open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [mystate.open])

  const handleCreateTag = () => {
    dispatch(createTag(mystate.name))
    setMystate({ ...mystate, open: false })
  }

  // parent calls this function when want to open the dialog
  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setMystate({ ...mystate, open: true })
    },
  }))

  return (
    <Dialog
      open={mystate.open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="create-post-dialog-title">Tag creation</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs className={classes.root}>
            <form noValidate autoComplete="off">
              <FormControl variant="outlined" className={classes.inputForm}>
                <OutlinedInput
                  id="title-input"
                  value={mystate.title}
                  onChange={event => {
                    setMystate({ ...mystate, name: event.target.value })
                  }}
                  placeholder="What's tag you want to create?"
                />
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className={classes.dialogButton}>
        <Button onClick={handleCreateTag} color="primary">
          Add tag
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default CreateTag
