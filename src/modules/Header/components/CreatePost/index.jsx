import React, { useImperativeHandle, forwardRef } from 'react'
import { useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Dialog relared stuff
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

// Form related stuff
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'

// markdown
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

// Tags related stuff
// import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
// import Chip from '@material-ui/core/Chip'

// my exports
import useStyles from './styles'

// const allTags = [
//   { id: 0, label: 'Angular' },
//   { id: 1, label: 'jQuery' },
//   { id: 2, label: 'Polymer' },
//   { id: 3, label: 'React' },
//   { id: 4, label: 'Vue.js' },
//   { id: 5, label: 'StepanJS The Best Framework Ever' },
// ]

const CreatePost = forwardRef((props, ref) => {
  const BASE_API = process.env.REACT_APP_BASE_URL
  const [chipData, updatechipData] = React.useState([])
  const getChipData = async () => {
    const resp = await fetch(`${BASE_API}/tags/1`)
    let data = await resp.json()
    data = data.response
    updatechipData(data)
  }
  React.useEffect(() => {
    getChipData()
    console.log('===============', chipData)
  }, [])
  const defaultState = {
    open: false,
    value: '**Hello world!!!**',
    selectedTab: 'write',
    title: '',
    selectedTags: [],
  }
  // State
  const [mystate, setMystate] = React.useState({ defaultState })
  const userID = useSelector(state => state.userID)

  const classes = useStyles()

  // handlers
  const handleTextChangeTitle = event => {
    setMystate({ ...mystate, title: event.target.value })
    // setTitle(event.target.value)
  }

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setMystate({ ...mystate, open: true })
      // setOpen(true)
    },
  }))

  const handleClose = () => {
    setMystate({ ...mystate, open: false })
    // setOpen(false)
  }

  const handleCreatePost = async () => {
    const tags = []
    mystate.selectedTags.forEach(item => {
      tags.push(item.label)
    })
    if (!mystate.title || !mystate.value) {
      setMystate({ ...mystate, title: 'Something went wrong' })
    } else {
      const resp = await fetch(
        `${BASE_API}/posts/0?title=${mystate.title}&content=${mystate.value}&author_id=${userID}`,
        { method: 'POST' },
      )
      const postID = await resp.json()
      if (resp.status === 201) {
        const resp2 = await fetch(`${BASE_API}/tags/${postID.response}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ tags }),
        })
        if (resp2.status === 201) {
          setMystate({ defaultState })
        } else {
          setMystate({ ...mystate, title: 'Something went wrong' })
        }
      } else {
        setMystate({ ...mystate, title: 'Something went wrong' })
      }
    }
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
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
      <DialogTitle id="scroll-dialog-title">Post creation</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6} className={classes.root}>
            <form noValidate autoComplete="off">
              <Typography variant="h5" gutterBottom className={classes.heading}>
                Title
              </Typography>
              <FormControl variant="outlined" className={classes.inputForm}>
                <OutlinedInput
                  id="component-outlined"
                  value={mystate.title}
                  onChange={handleTextChangeTitle}
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
              id="tags-outlined"
              options={chipData}
              onChange={(event, value) => {
                setMystate({ ...mystate, selectedTags: value })
              }} // prints the selected value
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
