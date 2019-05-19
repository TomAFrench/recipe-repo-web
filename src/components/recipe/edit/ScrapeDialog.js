import React, { useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'

function ScrapeDialog (props) {
  const [url, setUrl] = useState('')

  return (<Dialog
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby='form-dialog-title'
  >
    <DialogTitle id='form-dialog-title'>Scrape Recipe</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Enter the URL of the recipe you want to import
      </DialogContentText>
      <TextField
        autoFocus
        margin='dense'
        id='name'
        label='Recipe URL'
        value={url}
        onChange={(event) => { setUrl(event.target.value) }}
        type='url'
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} color='primary'>
        Cancel
      </Button>
      <Button onClick={() => { props.onConfirmation(url) }} color='primary'>
        Continue
      </Button>
    </DialogActions>
  </Dialog>)
}

export default ScrapeDialog
