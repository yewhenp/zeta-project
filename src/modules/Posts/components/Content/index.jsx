import { useState } from 'react'
import { Grid } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { PropTypes } from 'prop-types'

// markdown editor
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import Sidebar from '../Sidebar'
import Tags from '../Tags'

import useStyles from './styles'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const Content = ({ tags }) => {
  const classes = useStyles()
  const [value, setValue] = useState('**Hello world!!!**')

  Content.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }

  return (
    <Grid container spacing={2} className={classes.gridContainer}>
      <Grid item xs={1} className={classes.gridItem}>
        <Sidebar />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs className={classes.gridItem}>
        <div className={classes.container}>
          <Tags tags={tags} />

          <ReactMde
            value={value}
            classes={{ toolbar: classes.toolbar, preview: classes.preview }}
            minPreviewHeight={300}
            onChange={setValue}
            selectedTab="preview"
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default Content
