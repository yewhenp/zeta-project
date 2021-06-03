import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Dialog related stuff
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { addPostComment, handleCommentDialog } from '../../../../async_actions'
import useStyles from './styles'

const CreateСomment = () => {
  const open = useSelector(state => state.isCommentDialogOpen)
  const dispatch = useDispatch()
  const defaultState = {
    content: '**Empty**',
    selectedTab: 'write',
  }
  const [commentState, setCommentState] = React.useState({ defaultState })
  const classes = useStyles()

  const handleClose = () => {
    dispatch(handleCommentDialog(false))
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="create-post-dialog-title">Comment creation</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              Reply
            </Typography>
            <ReactMde
              id="problem-markdown-input"
              value={commentState.content}
              onChange={content => {
                setCommentState({ ...commentState, content })
              }}
              selectedTab={commentState.selectedTab}
              onTabChange={tab => {
                setCommentState({ ...commentState, selectedTab: tab })
              }}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
              childProps={{
                writeButton: {
                  tabIndex: -1,
                },
              }}
              minEditorHeight={150}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className={classes.dialogButton}>
        <Button
          onClick={() => dispatch(addPostComment(commentState.content))}
          color="primary"
        >
          Add comment
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateСomment
