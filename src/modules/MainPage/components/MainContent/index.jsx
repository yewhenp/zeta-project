import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Divider } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Pagination from '@material-ui/lab/Pagination'

import PostOverview from '../PostOverview'
import useStyles from './styles'

const MainPage = () => {
  const BASE_API = process.env.REACT_APP_BASE_URL

  const classes = useStyles()
  const selectedValues = useSelector(state => state.selectedValues)

  const [postData, updatePostData] = useState([])
  const getPostData = async (from, to) => {
    const resp = await fetch(
      `${BASE_API}/posts/1?many=true&from=${from}&to=${to}`,
    )
    let data = await resp.json()
    data = data.response
    updatePostData(data)
  }

  const perPage = 5
  const [pageCount, updatePageCount] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const getPageCount = async () => {
    const resp = await fetch(`${BASE_API}/posts/1?count=1`)
    let data = await resp.json()
    data = data.response
    let tempPageCount = Math.floor(data / perPage)
    const tempPageCountLeft = data % perPage
    if (tempPageCountLeft !== 0) {
      tempPageCount += 1
    }
    updatePageCount(tempPageCount)
  }

  const [page, updatePage] = useState(1)
  const setPage = val => {
    updatePage(val)
    getPostData(val * pageCount, (val + 1) * pageCount)
  }

  useEffect(() => {
    // getPageCount()
    getPostData(0, perPage)
  }, [])

  const includedInSelected = tags => {
    let containAllTags = true
    selectedValues.forEach(elem => {
      let subContainSomeTag = false
      tags.forEach(el => {
        if (el.id === elem.id) {
          subContainSomeTag = true
        }
      })
      if (subContainSomeTag === false) {
        containAllTags = false
      }
    })
    return containAllTags
  }

  return (
    <div className={classes.root}>
      <List>
        {postData.map(
          data =>
            (selectedValues.length === 0 || includedInSelected(data.tags)) && (
              <div key={data.id}>
                <ListItem className={classes.postItem}>
                  <PostOverview
                    postId={data.id}
                    postHeading={data.title}
                    postText={data.content}
                    postTags={data.tags}
                    postIcon={data.icon}
                    postViews={data.views}
                    postAnswers={data.comments.length}
                    postVotes={data.votes}
                    userName={data.username}
                    userRating={data.userrating}
                  />
                </ListItem>
                <Divider />
              </div>
            ),
        )}
      </List>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(event, val) => setPage(val)}
        color="primary"
      />
    </div>
  )
}

export default MainPage
