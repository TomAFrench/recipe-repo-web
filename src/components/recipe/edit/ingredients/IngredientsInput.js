import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import IngredientEntry from './IngredientEntry'

const styles = (theme) => ({})

const ingredientInitialState = {
  quantity: 0,
  unit: '',
  ingredient: '',
  note: ''
}

class IngredientsInput extends React.Component {
  componentDidMount () {
    // Always ensure that there is at least one IngredientEntry
    if (this.props.ingredients.length === 0) {
      this.handleAddIngredient(this.props)
    }
  }

  componentWillReceiveProps (newProps) {
    // Always ensure that there is at least one IngredientEntry
    if (newProps.ingredients.length === 0) {
      this.handleAddIngredient(newProps)
    } else if (newProps.ingredients[newProps.ingredients.length - 1].ingredient !== '') {
      this.handleAddIngredient(newProps)
    }
  }

  handleAddIngredient (props) {
    var ingredientsCopy = JSON.parse(JSON.stringify(props.ingredients))

    ingredientsCopy.push(ingredientInitialState)
    props.updateIngredients(ingredientsCopy)
  }

  handleDeleteIngredient (key) {
    // Filters out ingredient based on its key value
    var ingredientsCopy = JSON.parse(JSON.stringify(this.props.ingredients))
    ingredientsCopy.splice(key, 1)
    this.props.updateIngredients(ingredientsCopy)
  }

  handleChange (key, ingredient) {
    var ingredientsCopy = JSON.parse(JSON.stringify(this.props.ingredients))
    ingredientsCopy.splice(key, 1, ingredient)
    this.props.updateIngredients(ingredientsCopy)
  }

  renderIngredients () {
    const ingredientEntries = this.props.ingredients.map((ingredient, key) =>
      <IngredientEntry
        key={key}
        values={ingredient}
        handleChange={(ingredient) => { this.handleChange(key, ingredient) }}
        onClick={() => { this.handleDeleteIngredient(key) }}
        lastItem={false}
      />
    )
    const lastKey = this.props.ingredients.length - 1
    const lastIngredient = this.props.ingredients[lastKey]
    ingredientEntries[ingredientEntries.length - 1] = (
      <IngredientEntry
        key={lastKey}
        values={lastIngredient}
        handleChange={(event) => { this.handleChange(lastKey, event) }}
        lastItem
      />
    )
    return ingredientEntries
  }

  render () {
    return (
      <Grid container spacing={24}>
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
