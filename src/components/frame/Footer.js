import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2
  }
})

class MyFooter extends React.Component {
  render () {
    return (
      <footer className={this.props.classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          Recipe Repo
        </Typography>
        <Typography variant='subtitle1' align='center' color='textSecondary' component='p'>
          Come say hello on <a href={process.env.REACT_APP_GITHUB_URL} style={{ textDecoration: 'none', color: 'grey' }}> Github</a>!
        </Typography>
      </footer>
    )
  }
}

MyFooter.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyFooter)
