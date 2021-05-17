import { useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../../modules/Header/components/Header'
import Sidebar from '../../modules/MainPage/components/Sidebar'
import MainContent from '../../modules/MainPage/components/MainContent'

const useStyles = makeStyles({
  element: {
    height: '100%',
  },
})

const MainPageView = () => {
  const classes = useStyles()
  const childRef = useRef()

  const filterPostes = tagArr => {
    childRef.current.filterPosts(tagArr)
  }

  return (
    <div className={classes.element}>
      <Grid container spacing={3} className={classes.element}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={2} className={classes.element}>
          <Sidebar updateFilter={filterPostes} />
        </Grid>
        <Grid item xs={8} className={classes.element}>
          <MainContent ref={childRef} />
        </Grid>
      </Grid>
    </div>
  )
}

export default MainPageView
