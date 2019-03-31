import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';

import RecipeDisplay from './RecipeDisplay';
import RecipeGrid from './RecipeGrid';

import repoAPI from '../RecipeAPI';
import RecipeInput from '../RecipeInput/RecipeInput';

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
    super(props)
    this.state = {
      recipes: [],
      recipe: {},
      image: "",
      editMode: false
    }
    
  }

  componentDidMount(){
    this.getSelectedRecipe(this.props.match.params.id)
    this.getRecipeCards()
  }

  componentWillReceiveProps(nextProps){
    //Update the shown recipes if we move to a new page
    this.getSelectedRecipe(nextProps.match.params.id)
    this.getRecipeCards()
  }

  componentWillReceiveProps(nextProps){
    //Update the shown recipes if we move to a new page
    this.getRecipe(nextProps.match.params.id);
    this.getRecipes();
  }
  
  async getRecipeCards() {
    const numberOfRecipes = 4
    const response = await repoAPI.getRandomRecipes(numberOfRecipes);
    this.setState({recipes: response.data});
  }
  
  async getSelectedRecipe(recipe_id) {
    const response = await repoAPI.getRecipe(recipe_id);
    const newRecipe = response.data
    var newImage = ""
    if ("image" in response.data){
      newImage = this.decodeImage(response.data.image);
    }
    this.setState({recipe: newRecipe, image: newImage})
  }

  async deleteRecipe(){
    await repoAPI.deleteRecipe(this.props.match.params.id);
    this.setState({ redirect: true })
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  decodeImage(image) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(image.data.data));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    var recipeImage = "data:"+ image.contentType + ";base64," + window.btoa(binary)
    return recipeImage
  };

  editModeSwitch () {
    this.setState( {editMode: !this.state.editMode })
  }

  recipeWasEdited(newRecipe, newImage) {
    this.setState({recipe: newRecipe, image: newImage})
    this.editModeSwitch()
  }

  render() {
    const recipeImage = <img
                          className={this.props.classes.mainImage}
                          src={this.state.image}
                          alt=""
                        />
    const recipeDisplay = ('name' in this.state.recipe
                           ? <RecipeDisplay
                                recipe={this.state.recipe}
                                handleEditRecipe={this.editModeSwitch.bind(this)}
                                handleDeleteRecipe={this.deleteRecipe.bind(this)}
                           />
                           : ""
                          )
    
    const recipeEditor = <RecipeInput 
                            initalRecipe={this.state.recipe}
                            initalImage={this.state.image}
                            saveAction={this.recipeWasEdited.bind(this)}
                            />
    
    return (
    <React.Fragment>
      {this.renderRedirect()}
      <Grid container spacing={24}>
        <div className={this.props.classes.layout}>
          {recipeImage}
          {this.state.editMode ? recipeEditor: recipeDisplay}
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