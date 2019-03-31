import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

class FileUploadButton extends React.Component {
  render () {
    return (
      <Fragment>
        <input
          accept='image/*'
          className={this.props.classes.input}
          id='raised-button-file'
          type='file'
          style={{ display: 'none' }}
          onChange={this.props.handlefile}
        />
        <label htmlFor='raised-button-file'>
          <Button variant='contained' size='small' color='primary' component='span' className={this.props.classes.button}>
            {this.props.children}
          </Button>
        </label>
      </Fragment>
    )
  }
}

FileUploadButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FileUploadButton)
