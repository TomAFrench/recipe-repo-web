import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Grid, TextField, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing.unit * 1
  }
})

class IngredientEntry extends React.Component {
  validate (ingredient) {
    const quantity = Number.parseFloat(ingredient.quantity)
    if (Number.isNaN(quantity) || quantity < 0) {
      return false
    }
    return true
  }

  handleValueChange (event) {
    const name = event.target.name
    const value = event.target.value

    var ingredient = Object.assign({}, this.props.values)
    ingredient[name] = value
    if (this.validate(ingredient)) {
      this.props.handleChange(ingredient)
    }
  }

  render () {
    return (
      <Grid item container xs={12} spacing={24}>
        <Grid item xs={2}>
          <TextField
            id='quantity'
            name='quantity'
            label='Quantity'
            fullWidth
            type='number'
            variant='outlined'
            value={this.props.values.quantity}
            onChange={(event) => { this.handleValueChange(event) }}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            id='unit'
            name='unit'
            label='Unit'
            fullWidth
            variant='outlined'
            value={this.props.values.unit}
            onChange={(event) => { this.handleValueChange(event) }}
          />
        </Grid>
        <Grid item xs={4} >
          <TextField
            required
            id='ingredient'
            name='ingredient'
            label='Add an ingredient'
            variant='outlined'
            fullWidth
            value={this.props.values.ingredient}
            onChange={(event) => { this.handleValueChange(event) }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id='note'
            name='note'
            label='Note'
            variant='outlined'
            fullWidth
            value={this.props.values.note}
            onChange={(event) => { this.handleValueChange(event) }}
          />
        </Grid>
        <Grid item xs={1}>
          {(!this.props.lastItem) &&
          <IconButton className={this.props.classes.button} aria-label='Delete' onClick={this.props.onClick}>
            <DeleteIcon />
          </IconButton>
          }
        </Grid>

      </Grid>
    )
  }
}

IngredientEntry.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IngredientEntry)
