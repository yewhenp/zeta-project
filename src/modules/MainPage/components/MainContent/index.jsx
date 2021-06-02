import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Divider } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Pagination from '@material-ui/lab/Pagination'

import PostOverview from '../PostOverview'
import useStyles from './styles'

import fetchPostList from '../../../../actions/thunkActions'

const MainPage = () => {
  // const BASE_API = process.env.REACT_APP_BASE_URL

  const classes = useStyles()

  const dispatch = useDispatch()
  const selectedValues = useSelector(state => state.selectedValues)

  // const getPostData = async (from, to) => {
  //   const resp = await fetch(
  //     `${BASE_API}/posts/1?many=true&from=${from}&to=${to + 1}`,
  //   )
  //   let data = await resp.json()
  //   data = data.response
  //   updatePostData(data)
  // }
  const postData = useSelector(state => state.postList)
  // const postCountMain = useSelector(state => state.postCount)

  const perPage = 5
  const [pageCount, updatePageCount] = useState(1)
  const getPageCount = postCount => {
    let tempPageCount = Math.floor(postCount / perPage)
    const tempPageCountLeft = postCount % perPage
    if (tempPageCountLeft !== 0) {
      tempPageCount += 1
    }
    updatePageCount(tempPageCount)
  }

  const [page, updatePage] = useState(1)
  const setPage = val => {
    updatePage(val)
    // if (perPage % 2 === 0) {
    //   getPostData((val - 1) * pageCount, val * pageCount)
    // } else if (val - 1 === 0) {
    //   getPostData((val - 1) * pageCount, val * pageCount + 1)
    // } else {
    //   getPostData((val - 1) * pageCount + 1, val * pageCount + 1)
    // }
  }

  useEffect(() => {
    // getPageCount()
    // getPostData(0, perPage)
    dispatch(fetchPostList())
  }, [])

  // useEffect(() => getPageCount(postCountMain), [postCountMain])

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

  const [reducedPostData, updateReducedPostData] = useState([])
  useEffect(() => {
    let tempData = []
    if (selectedValues.length === 0) {
      tempData = [...postData]
    } else {
      postData.forEach(data => {
        if (includedInSelected(data.tags)) {
          tempData.push(data)
        }
      })
    }
    updateReducedPostData(tempData.slice((page - 1) * perPage, page * perPage))
    getPageCount(tempData.length)
  }, [postData, page, selectedValues])

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
          onChange={(event, val) => setPage(val)}
          color="primary"
        />
      )}
    </div>
  )
}

export default MainPage
