import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Divider } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Pagination from '@material-ui/lab/Pagination'

import PostOverview from '../PostOverview'
import useStyles from './styles'

import { fetchPostList } from '../../../../actions/thunkActions'

const MainPage = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const selectedValues = useSelector(state => state.selectedValues)
  const postData = useSelector(state => state.postList)

  const perPage = 5
  const [pageCount, updatePageCount] = useState(1)

  const searchString = useSelector(state => state.searchString)
  const [reducedPostData, updateReducedPostData] = useState([])

  const [page, updatePage] = useState(1)

  const getPageCount = postCount => {
    let tempPageCount = Math.floor(postCount / perPage)
    const tempPageCountLeft = postCount % perPage
    if (tempPageCountLeft !== 0) {
      tempPageCount += 1
    }
    updatePageCount(tempPageCount)
  }

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

  useEffect(() => {
    let tempData = []
    let tempData2 = []
    if (selectedValues.length === 0) {
      tempData = [...postData]
    } else {
      postData.forEach(data => {
        if (includedInSelected(data.tags)) {
          tempData.push(data)
        }
      })
    }
    if (searchString.length === 0) {
      tempData2 = [...tempData]
    } else {
      tempData.forEach(data => {
        if (
          data.title.includes(searchString) ||
          data.content.includes(searchString)
        ) {
          tempData2.push(data)
        }
      })
    }
    const compare = (a, b) => {
      if (a.views < b.views) {
        return 1
      }
      if (a.views > b.views) {
        return -1
      }
      return 0
    }
    tempData2.sort(compare)
    updateReducedPostData(tempData2.slice((page - 1) * perPage, page * perPage))
    getPageCount(tempData2.length)
  }, [postData, page, selectedValues, searchString])

  useEffect(() => {
    dispatch(fetchPostList())
  }, [])

  return (
    <div className={classes.root}>
      <List>
        {reducedPostData.map(data => (
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
        ))}
      </List>
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={(event, val) => updatePage(val)}
          className={classes.pagination}
          color="primary"
        />
      )}
    </div>
  )
}

export default MainPage
