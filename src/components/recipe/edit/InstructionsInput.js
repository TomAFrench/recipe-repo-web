import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Grid, TextField, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

const styles = (theme) => ({})

class InstructionsInput extends React.Component {
  componentDidMount () {
    // Always ensure that there is at least one step
    if (this.props.instructions.length === 0) {
      this.handleAddStep()
    }
  }

  componentWillReceiveProps (newProps) {
    // Always ensure that there is at least one step
    if (newProps.instructions.length === 0) {
      this.handleAddStep()
    }
    if (newProps.instructions[newProps.instructions.length - 1] !== '') {
      this.handleAddStep()
    }
  }

  handleAddStep () {
    var instructionsCopy = this.props.instructions
    instructionsCopy.push('')
    this.props.updateInstructions(instructionsCopy)
  }

  handleDeleteStep (key) {
    // Filters out step based on its key value
    var instructionsCopy = this.props.instructions
    instructionsCopy.splice(key, 1)
    this.props.updateInstructions(instructionsCopy)
  }

  handleChange (key, event) {
    var instructionsCopy = this.props.instructions
    instructionsCopy.splice(key, 1, event.target.value)
    this.props.updateInstructions(instructionsCopy)
  }

  renderinstructions () {
    const instructionsEntries = this.props.instructions.map((instruction, key) =>
      <Grid item container xs={12} wrap='nowrap' key={key}>
        <Grid item xs={12}>
          <TextField
            required
            id='instructions'
            name='instructions'
            label={'Step ' + (key + 1)}
            fullWidth
            multiline
            rowsMax={20}
            variant='outlined'
            value={instruction}
            onChange={(event) => { this.handleChange(key, event) }}
            autoFocus
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton className={this.props.classes.button} aria-label='Delete' onClick={() => { this.handleDeleteStep(key) }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    )
    const lastKey = this.props.instructions.length - 1
    const lastStep = this.props.instructions[lastKey]
    instructionsEntries[instructionsEntries.length - 1] = (
      <Grid item xs={12} key={lastKey}>
        <TextField
          required
          id='instructions'
          name='instructions'
          label='Write in your instructions'
          fullWidth
          multiline
          rowsMax={20}
          variant='outlined'
          value={lastStep}
          key={lastKey}
          onChange={(event) => { this.handleChange(lastKey, event) }}
        />
      </Grid>
    )
    return instructionsEntries
  }

  render () {
    return (
      <Grid container spacing={24}>
        {this.renderinstructions()}
      </Grid>
    )
  }
}

InstructionsInput.propTypes = {
  classes: PropTypes.object.isRequired,
  instructions: PropTypes.array.isRequired
}

export default withStyles(styles)(InstructionsInput)
