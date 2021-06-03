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

// Form related stuff
// import FormControl from '@material-ui/core/FormControl'
// import OutlinedInput from '@material-ui/core/OutlinedInput'
// import Autocomplete from '@material-ui/lab/Autocomplete'
// import TextField from '@material-ui/core/TextField'

// markdown
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { addPostComment, handleCommentDialog } from '../../../../async_actions'

// my exports
import useStyles from './styles'

const CreateСomment = () => {
  // const BASE_API = process.env.REACT_APP_BASE_URL
  // const [chipData, updatechipData] = React.useState([])
  // const getChipData = async () => {
  //   const resp = await fetch(`${BASE_API}/tags/1`)
  //   let data = await resp.json()
  //   data = data.response
  //   updatechipData(data)
  // }

  const open = useSelector(state => state.isCommentDialogOpen)
  // const postID = useSelector(state => state.post.id)
  // const userID = useSelector(state => state.post.id)
  const dispatch = useDispatch()
  const defaultState = {
    content: '**Empty**',
    selectedTab: 'write',
  }
  // State
  const [commentState, setCommentState] = React.useState({ defaultState })

  // userID from redux - used for adding post
  // const userID = useSelector(state => state.userID)
  const classes = useStyles()

  const handleClose = () => {
    dispatch(handleCommentDialog(false))
  }

  // parent calls this function when want to open the dialog
  // useImperativeHandle(ref, () => ({
  //   handleClickOpen() {
  //     setCommentState({ ...commentState, open: true })
  //   },
  // }))

  // Extract information about all tags from backend
  // React.useEffect(() => {
  //   getChipData()
  // }, [])

  // create post button
  // const handleCreatePost = async () => {
  //   // extract names of tags
  //   // const tags = []
  //   // CommentState.selectedTags.forEach(item => {
  //   //   tags.push(item.label)
  //   // })

  //   // empty fields TODO: add adequate error message
  //   if (!commentState.title || !commentState.value) {
  //     setCommentState({ ...commentState, title: 'Something went wrong' })
  //   } else {
  //     // add comment to database
  //     fetch(`${BASE_API}/comments/${userID}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({ commentState }),
  //     })
  //     // now retrieve id of the added post from db
  //     // const postID = await resp.json()
  //     // if (resp.status === 201) {
  //     //   // now add tags for this post
  //     //   const resp2 = await fetch(`${BASE_API}/tags/${postID.response}`, {
  //     //     method: 'POST',
  //     //     headers: {
  //     //       'Content-type': 'application/json',
  //     //     },
  //     //     body: JSON.stringify({ tags }),
  //     //   })
  //     //   if (resp2.status === 201) {
  //     //     // everything OK - close dialog
  //     //     setCommentState({ defaultState })
  //     //   } else {
  //     //     setCommentState({ ...CommentState, title: 'Something went wrong' })
  //     //   }
  //     // } else {
  //     //   setCommentState({ ...CommentState, title: 'Something went wrong' })
  //     // }
  //   }
  // }

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
      <DialogTitle id="create-post-dialog-title">Post creation</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              Response
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
          Add post
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateСomment
