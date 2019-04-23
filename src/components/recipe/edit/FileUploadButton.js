import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'

const styles = theme => ({
  input: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

class FileUploadButton extends React.Component {
  render () {
    return (
      <Fragment>
        <input
          accept={this.props.fileType}
          className={this.props.classes.input}
          id={this.props.id}
          type='file'
          style={{ display: 'none' }}
          onChange={this.props.handlefile}
        />
        <label htmlFor={this.props.id}>
          <Button variant='contained' size='small' color='primary' component='span' className={this.props.classes.input}>
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
