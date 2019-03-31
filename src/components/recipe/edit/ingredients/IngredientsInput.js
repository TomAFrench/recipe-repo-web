import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import IngredientEntry from './IngredientEntry'

const styles = (theme) => ({})

const ingredientInitialState = {
  quantity: 0,
  unit: '',
  ingredient: ''
}

class IngredientsInput extends React.Component {
  componentDidMount () {
    // Always ensure that there is at least one IngredientEntry
    if (this.props.ingredients.length === 0) {
      this.handleAddIngredient()
    }
  }

  componentWillReceiveProps (newProps) {
    // Always ensure that there is at least one IngredientEntry
    if (newProps.ingredients.length === 0) {
      this.handleAddIngredient()
    }
  }

  handleAddIngredient () {
    var ingredientsCopy = this.props.ingredients
    ingredientsCopy.push(ingredientInitialState)
    this.props.updateIngredients(ingredientsCopy)
  }

  handleDeleteIngredient (key) {
    // Filters out ingredient based on its key value
    var ingredientsCopy = this.props.ingredients
    ingredientsCopy.splice(key, 1)
    this.props.updateIngredients(ingredientsCopy)
  }

  handleChange (key, ingredient) {
    var ingredientsCopy = this.props.ingredients
    ingredientsCopy.splice(key, 1, ingredient)
    this.props.updateIngredients(ingredientsCopy)
  }

  renderIngredients () {
    console.log(this.props.ingredients)
    const ingredientEntries = this.props.ingredients.map((ingredient, key) =>
      <IngredientEntry
        key={key}
        values={ingredient}
        handleChange={this.handleChange.bind(this, key)}
        onClick={this.handleDeleteIngredient.bind(this, key)}
        lastItem={false}
      />
    )
    const lastKey = this.props.ingredients.length - 1
    const lastIngredient = this.props.ingredients[lastKey]
    ingredientEntries[ingredientEntries.length - 1] = (
      <IngredientEntry
        key={lastKey}
        values={lastIngredient}
        handleChange={this.handleChange.bind(this, lastKey)}
        onClick={this.handleAddIngredient.bind(this)}
        lastItem
      />
    )
    return ingredientEntries
  }

  render () {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant='subtitle1' color='textSecondary' inline='true'>
            Ingredients
          </Typography>
        </Grid>
        {this.renderIngredients()}
      </Grid>
    )
  }
}

IngredientsInput.propTypes = {
  classes: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired
}

export default withStyles(styles)(IngredientsInput)
