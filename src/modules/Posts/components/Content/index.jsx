// import { useState } from 'react'
import { Grid } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { PropTypes } from 'prop-types'

// markdown editor
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import Sidebar from '../Sidebar'
import Tags from '../Tags'
import User from '../User'

import useStyles from './styles'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const Content = ({ votesCount, author, tags, postContent }) => {
  Content.propTypes = {
    votesCount: PropTypes.arrayOf().isRequired,
    postContent: PropTypes.arrayOf().isRequired,
    author: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
      avatarIcon: PropTypes.string.isRequired,
      userRating: PropTypes.number.isRequired,
    }).isRequired,

    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  const classes = useStyles()
  const [votes, setVotes] = votesCount
  const [value, setValue] = postContent

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={1} className={classes.gridItem}>
        <Sidebar votes={votes} setVotes={setVotes} />
      </Grid>
      <Grid item xs={11} className={classes.gridItem}>
        <div className={classes.container}>
          <ReactMde
            value={value}
            classes={{
              toolbar: classes.toolbar,
              preview: classes.preview,
              reactMde: classes.reactMde,
            }}
            minPreviewHeight={0}
            onChange={setValue}
            selectedTab="preview"
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
          <Divider variant="middle" />
          <Tags tags={tags} />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item className={classes.user}>
              <User
                nickname={author.nickname}
                avatarIcon={author.avatarIcon}
                userRating={author.userRating}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}
export default Content
