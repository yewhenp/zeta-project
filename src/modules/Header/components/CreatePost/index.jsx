import React, { useImperativeHandle, forwardRef, useEffect, useRef, useState } from 'react'
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
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

// markdown
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

// my exports
import useStyles from './styles'
import fetchPostList from '../../../../actions/thunkActions'

const CreatePost = forwardRef((props, ref) => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const dispatch = useDispatch()

  const [chipData, updatechipData] = useState([])

  // used during loading, to get all tags
  const getChipData = async () => {
    const resp = await fetch(`${BASE_API}/tags/1`)
    const data = await resp.json()
    return data.response
  }

  const defaultState = {
    open: false,
    value: '**Hello world!!!**',
    selectedTab: 'write',
    title: '',
    selectedTags: [],
  }

  // State
  const [mystate, setMystate] = useState(defaultState)

  // userID from redux - used for adding post
  const userID = useSelector(state => state.userID)
  const classes = useStyles()

  const handleClose = () => {
    setMystate({ ...mystate, open: false })
  }

  // create post button
  const handleCreatePost = async () => {
    // extract names of tags
    const tags = []
    // console.log(mystate)
    mystate.selectedTags.forEach(item => {
      tags.push(item.label)
    })

    // empty fields TODO: add adequate error message
    if (!mystate.title || !mystate.value) {
      setMystate({ ...mystate, title: 'Something went wrong' })
    } else {
      // add post to database
      const resp = await fetch(
        `${BASE_API}/posts/0?title=${mystate.title}&content=${mystate.value}&author_id=${userID}`,
        { method: 'POST' },
      )
      // now retrieve id of the added post from db
      const postID = await resp.json()
      if (resp.status === 201) {
        // now add tags for this post
        const resp2 = await fetch(`${BASE_API}/tags/${postID.response}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ tags }),
        })
        if (resp2.status === 201) {
          // everything OK - close dialog
          dispatch(fetchPostList())
          setMystate({ ...defaultState })
        } else {
          setMystate({ ...mystate, title: 'Something went wrong' })
        }
      } else {
        setMystate({ ...mystate, title: 'Something went wrong' })
      }
    }
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

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  // parent calls this function when want to open the dialog
  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setMystate({ ...mystate, open: true })
    },
  }))

  // Extract information about all tags from backend
  useEffect(async () => {
    updatechipData(await getChipData())
  }, [])

  return (
    <Dialog
      open={mystate.open}
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
          <Grid item xs={6} className={classes.root}>
            <form noValidate autoComplete="off">
              <Typography variant="h5" gutterBottom className={classes.heading}>
                Title
              </Typography>
              <FormControl variant="outlined" className={classes.inputForm}>
                <OutlinedInput
                  id="title-input"
                  value={mystate.title}
                  onChange={event => {
                    setMystate({ ...mystate, title: event.target.value })
                  }}
                  placeholder="What's your problem?"
                />
              </FormControl>
            </form>
          </Grid>

          <Grid item xs={6} className={classes.root}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              Tags
            </Typography>
            <Autocomplete
              multiple
              id="tags-input"
              options={chipData}
              onChange={(event, value) => {
                setMystate({ ...mystate, selectedTags: value })
              }}
              getOptionLabel={option => option.label}
              filterSelectedOptions
              className={classes.inputForm}
              renderInput={params => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  variant="outlined"
                  placeholder="Type question-related tags"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              Question
            </Typography>
            <ReactMde
              id="problem-markdown-input"
              value={mystate.value}
              onChange={value_ => {
                setMystate({ ...mystate, value: value_ })
              }}
              selectedTab={mystate.selectedTab}
              onTabChange={tab => {
                setMystate({ ...mystate, selectedTab: tab })
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
        <Button onClick={handleCreatePost} color="primary">
          Add post
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default CreatePost
