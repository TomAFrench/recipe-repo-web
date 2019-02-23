import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  mainImage: {
    width: '100px',
    margin: 'auto'
  },
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
});

class RecipeDisplay extends React.Component {

  render() {
    //Chill for a second if there is no recipe yet
    if (!("name" in this.props.recipe)) {
      return null
    }

    var source = (
      <Typography display='inline' variant="h6" align="center" color="textSecondary" paragraph>
        {this.props.recipe.source_name}
      </Typography>
    )
    // Check if source has associated url before making a link
    if ("source_url" in this.props.recipe){
      source = (
      <a style={{marginLeft:7, textDecoration: 'none'}} href={this.props.recipe.source_url} >
        {source}
      </a>
      )
    }
    
    return (
    <Paper className={this.props.classes.paper}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        {this.props.recipe.name}
      </Typography>
      <div style={{display:"flex"}}>
        <Typography display='inline' variant="h6" align="center" color="textSecondary" paragraph>
          A recipe by
        </Typography>
        {source}
      </div>
      <Typography display='inline' variant="h6" color="textSecondary" paragraph>
          This is a description of the recipe.
      </Typography>
      <Typography display='inline' variant="h6" color="textPrimary" paragraph>
        Ingredients:
      </Typography>
      <Typography display='inline' variant="h6" color="textSecondary" paragraph>
        {this.props.recipe.ingredients}
      </Typography>
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