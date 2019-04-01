import React from 'react'
import Button from '@material-ui/core/Button'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

class DeleteDialog extends React.Component {
  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeAction}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' paragraph>
            Are you sure you want to delete {this.props.recipeName}?
          </DialogContentText>
          <DialogContentText id='alert-dialog-description'>
            This can't be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeAction} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.props.confirmAction} color='secondary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DeleteDialog
