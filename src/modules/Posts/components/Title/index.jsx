import 'react-mde/lib/styles/css/react-mde-all.css'
import CardHeader from '@material-ui/core/CardHeader'
import { PropTypes } from 'prop-types'
import { Typography, Grid } from '@material-ui/core'

const convertNumber = number => {
  const options = [
    ['', 1],
    ['thousand', 1e3],
    ['million', 1e6],
    ['billion', 1e9],
  ]
  const index = Math.floor(Math.log10(number) / 3)
  return `${(number / options[index][1]).toFixed(1)} ${options[index][0]} times`
}

const convertDate = (
  stringDate,
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
) => new Date(stringDate).toLocaleDateString('en-US', options)

const Title = ({ title, timeCreated, timeLastActive, views }) => {
  Title.propTypes = {
    title: PropTypes.string.isRequired,
    timeCreated: PropTypes.string.isRequired,
    timeLastActive: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
  }

  return (
    <CardHeader
      title={title}
      subheader={
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Typography variant="subtitle2">
              Asked <strong>{convertDate(timeCreated)}</strong>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2">
              Active <strong>{convertDate(timeLastActive)}</strong>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2">
              Viewed <strong>{convertNumber(views)}</strong>
            </Typography>
          </Grid>
        </Grid>
      }
    />
  )
}

export default Title
