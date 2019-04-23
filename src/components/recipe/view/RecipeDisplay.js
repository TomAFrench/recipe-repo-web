import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Paper, Typography, Button, Grid } from '@material-ui/core'
import IngredientsAndInstructions from './IngredientsAndInstructions'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
      minWidth: 1000,
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
})

class RecipeDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  renderSource (sourceName, sourceUrl) {
    if (typeof sourceName === 'undefined' || sourceName === '') {
      return null
    }

    var sourceText = (
      <Typography variant='h6' align='center' color='textSecondary'>
        {sourceName}
      </Typography>
    )

    // If source has associated url then make it a link
    if (sourceUrl != null) {
      sourceText = (
        <Typography variant='h6' align='center' color='textSecondary' component='a' href={sourceUrl} style={{ textDecoration: 'none' }}>
          {sourceName}
        </Typography>
      )
    }

    return sourceText
  }

  render () {
    const recipeTitle = (
      <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
        {this.props.recipe.name}
      </Typography>
    )

    return (
      <Paper className={this.props.classes.paper}>
        {this.renderRedirect}
        <Grid container direction='column'>
          <Grid item>
            {recipeTitle}
          </Grid>
          <Grid item>
            {this.renderSource(this.props.recipe.sourceName, this.props.recipe.sourceUrl)}
          </Grid>
          <IngredientsAndInstructions ingredients={this.props.recipe.ingredients} instructions={this.props.recipe.instructions} />
          <Grid container item direction='row' spacing='8' justify='flex-end'>
            <Grid item>
              <Button className={this.props.classes.button} variant='contained' size='small' color='primary' onClick={this.props.handleEditRecipe}>
                Edit Recipe
              </Button>
            </Grid>
            <Grid item>
              <Button className={this.props.classes.button} variant='contained' size='small' color='primary' onClick={this.props.handleDeleteRecipe}>
                Delete Recipe
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper >
    )
  }
}

RecipeDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeDisplay)
