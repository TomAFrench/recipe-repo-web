import React from 'react';
import PropTypes from 'prop-types';
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
    width: '1000px',
    margin: 'auto'
  },
});

class RecipeViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipe: {},
      image: ""
    }
    this.getRecipe();
    this.getRecipes();
  }

  getRecipes() {
    axios.get(process.env.REACT_APP_API_URL + '/recipes')
      .then(response => this.setState({recipes: response.data}));
  }
  
  getRecipe() {
    axios.get(process.env.REACT_APP_API_URL + '/recipes/' + this.props.match.params.id)
      .then(response => this.setState({recipe: response.data}))
      .then(() => this.decodeImage());
  }
  
  componentWillReceiveProps(nextProps){
    //Update the shown recipes if we move to a new page
    this.getRecipe();
    this.getRecipes();
  }

  decodeImage() {
    if ("image" in this.state.recipe) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(this.state.recipe.image.data.data));

      bytes.forEach((b) => binary += String.fromCharCode(b));

      var recipeImage = "data:"+ this.state.recipe.image.contentType + ";base64," + window.btoa(binary)
      this.setState({image: recipeImage})
    }
  };

  render() {
    
    console.log(this.state.recipe)
    var recipeImage = ""
    if (this.state.image !== "") {
      recipeImage = <img className={this.props.classes.mainImage}
                      src={this.state.image}/>
    }

    return (
    <React.Fragment>
      <Grid container spacing={24}>
        <div className={this.props.classes.layout}>
          {recipeImage}
          {<RecipeDisplay recipe={this.state.recipe} />}
        </div>
        </Grid>
      <div className={this.props.classes.layout}>
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