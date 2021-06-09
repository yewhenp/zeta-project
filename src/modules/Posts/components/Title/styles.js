import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#A8D278',
    },
    secondary: {
      main: '#9ccc65',
    },
  },
})

// const useStyles = makeStyles(theme => ({
//   gridContainer: {
//     direction: 'row',
//     justify: 'space-around',
//     alignItems: 'center',
//   },
//   container: {
//     width: '100%',
//     padding: theme.spacing(0.5),
//   },
//   title: {
//     textAlign: 'center',
//   },
//   paper: {
//     width: '100%',
//     height: '100%',
//   },
// }))

export default theme
