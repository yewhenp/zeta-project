import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import MainPageView from './views/MainPage'
import PostView from './views/PostView'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          '& .rootElement': {
            height: '100%',
          },
        },
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPageView />
          </Route>
          <Route path="/post/:ID">
            <PostView />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,

  // eslint-disable-next-line no-undef
  document.getElementById('root'),
)
