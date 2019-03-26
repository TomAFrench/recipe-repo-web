import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
});

class RecipeDisplay extends React.Component {

  renderSource(sourceName, sourceUrl){
    if (sourceName === undefined){
      console.log("hi", sourceName, sourceUrl)
      return null
    }

    var sourceText = (
      <Typography variant="h6" align="center" color="textSecondary">
          {sourceName}        
      </Typography>
      )

    // If source has associated url then make it a link
    if (sourceUrl != null){
      sourceText = (
      <Typography variant="h6" align="center" color="textSecondary" component="a" href={sourceUrl} style={{textDecoration: 'none'}}>
          {sourceName}        
      </Typography>
      )
    }

    return (
      <div>
      <Typography variant="h6" align="center" color="textSecondary">
        A recipe by
      </Typography>
      {sourceText}
      </div>
    )
  }
  
  renderIngredients() {
    return this.props.recipe.ingredients.map((ingredient) => (
      <Typography display='inline' variant="h6" color="textSecondary" paragraph>
        {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
      </Typography>
    ))
  }

  render() {
    return (
    <Paper className={this.props.classes.paper}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        {this.props.recipe.name}
      </Typography>
      {this.renderSource(this.props.recipe.source_name, this.props.recipe.source_url)}
      <Typography display='inline' variant="h6" color="textSecondary" paragraph>
          This is a description of the recipe.
      </Typography>
      <Typography display='inline' variant="h6" color="textPrimary" paragraph>
        Ingredients:
      </Typography>
      {this.renderIngredients()}
      <Typography display='inline' variant="h6" color="textPrimary" paragraph>
        Instructions:
      </Typography>
      <Typography display='inline' variant="h6" color="textSecondary" paragraph>
        {this.props.recipe.instructions}
      </Typography>
    </Paper>
    )
  }
}

RecipeDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeDisplay);