import React, { useImperativeHandle, forwardRef } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Dialog relared stuff
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const allTags = [
  { id: 0, label: 'Angular' },
  { id: 1, label: 'jQuery' },
  { id: 2, label: 'Polymer' },
  { id: 3, label: 'React' },
  { id: 4, label: 'Vue.js' },
  { id: 5, label: 'StepanJS The Best Framework Ever' },
]

const CreatePost = forwardRef((props, ref) => {
  // States
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('**Hello world!!!**')
  const [selectedTab, setSelectedTab] = React.useState('write')
  const [title, setTitle] = React.useState('')

  const classes = useStyles()

  // handlers
  const handleTextChangeTitle = event => {
    setTitle(event.target.value)
  }

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true)
    },
  }))

  const handleClose = () => {
    setOpen(false)
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
      <DialogTitle id="scroll-dialog-title">Post creation</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Grid container spacing={1}>
            <Grid item xs={6} className={classes.root}>
              <form noValidate autoComplete="off">
                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.heading}
                >
                  Title
                </Typography>
                <FormControl variant="outlined" className={classes.inputForm}>
                  <OutlinedInput
                    id="component-outlined"
                    value={title}
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
                options={allTags}
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
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
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
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogButton}>
        <Button onClick={handleClose} color="primary">
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
