import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
});

class RecipeGrid extends React.Component {
  render() {
    return (
      <Grid container spacing={40} className={this.props.classes.cardGrid}>
        {this.props.recipes.map(recipe =>
          (
          <Grid item key={recipe._id} sm={3} md={3}>
            <RecipeCard recipe={recipe} />
          </Grid>
          ))
        }
      </Grid>
    )
  }
}

RecipeGrid.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default withStyles(styles)(RecipeGrid);