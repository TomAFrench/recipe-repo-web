import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import RecipeDisplay from './RecipeDisplay';
import RecipeGrid from './RecipeGrid';

import repoAPI from '../RecipeAPI';

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
    display: 'block',
    maxWidth: '100%',
    maxHeight: 500,
    margin: 'auto',
    marginTop: 4 * theme.spacing.unit,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      maxWidth: 1000,
    },
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
    
  }

  componentDidMount(){
    this.getRecipe(this.props.match.params.id);
    this.getRecipes();
  }
  
  async getRecipes() {
    const numberOfRecipes = 4
    const response = await repoAPI.getRandomRecipes(numberOfRecipes);
    this.setState({recipes: response.data});
  }
  
  async getRecipe(recipe_id) {
    const response = await repoAPI.getRecipe(recipe_id);
    this.setState({recipe: response.data});
    if ("image" in response.data){
      this.decodeImage(response.data.image);
    }
  }
  
  componentWillReceiveProps(nextProps){
    //Update the shown recipes if we move to a new page
    this.getRecipe(nextProps.match.params.id);
    this.getRecipes();
  }

  async decodeImage(image) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(image.data.data));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    var recipeImage = "data:"+ image.contentType + ";base64," + window.btoa(binary)
    this.setState({image: recipeImage})
  };

  render() {
    const recipeImage = <img
                          className={this.props.classes.mainImage}
                          src={this.state.image}
                          alt=""
                        />
    const recipeDisplay = ('name' in this.state.recipe
                           ? <RecipeDisplay recipe={this.state.recipe} />
                           : ""
                          )
    return (
    <React.Fragment>
      <Grid container spacing={24}>
        <div className={this.props.classes.layout}>
          {recipeImage}
          {recipeDisplay}
        </div>
        </Grid>
      <div className={this.props.classes.layout}>
        <RecipeGrid recipes={this.state.recipes}/>
      </div>
    </React.Fragment>
    )
  }
}

RecipeViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeViewer);