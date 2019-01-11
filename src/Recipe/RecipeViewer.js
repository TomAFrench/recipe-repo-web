import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import RecipeDisplay from './RecipeDisplay';
import RecipeGrid from './RecipeGrid';

import axios from 'axios';

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

class RecipeViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipe: {}
    }
    this.getRecipe();
    this.getRecipes();
  }

  getRecipes() {
    axios.get(process.env.REACT_APP_API_URL +'/recipes')
      .then(response => this.setState({recipes: response.data}));
  }
  
  getRecipe() {
    axios.get(process.env.REACT_APP_API_URL +'/recipes/' + this.props.match.params.id)
      .then(response => this.setState({recipe: response.data}));
  }
  
  componentWillReceiveProps(nextProps){
    //Update the shown recipes if we move to a new page
    this.getRecipe();
    this.getRecipes();
  }
  render() {
    
    console.log(this.state.recipe)
    var recipeImage = ""
    if ("image" in this.state.recipe) {
      let base64String = '0'//btoa(String.fromCharCode(...this.state.recipe.image.data));
      recipeImage = <img className={this.props.classes.mainImage}
                      src={"data:image/png;base64," + base64String}/>
    }

    return (
    <React.Fragment>
      <Grid container spacing={24}>
        <div className={this.props.classes.layout}>
          {recipeImage}
          {<RecipeDisplay recipe={this.state.recipe} />}
        </div>
        </Grid>
      <div className={classNames(this.props.classes.layout, this.props.classes.cardGrid)}>
        <RecipeGrid recipes={this.state.recipes.slice(0,5)}/>
      </div>
    </React.Fragment>
    )
  }
}

RecipeViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeViewer);