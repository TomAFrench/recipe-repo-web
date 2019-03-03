import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import IngredientsInput from './IngredientsInput'

import Button from '@material-ui/core/Button'
import repoAPI from '../RecipeAPI';
import FileUploadButton from '../RecipeInput/FileUploadButton';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
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

class RecipeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: "",
        sourceName: "",
        sourceUrl: "",
        ingredients: {},
        instructions: "",
      },
      image: {}
    }
  }


  handleIngredientsChange(ingredients) {
    this.setState({recipe: {...this.state.recipe, ingredients: ingredients}}, () => console.log(this.state.recipe.ingredients))
  }

  handleRecipeChange(event) {
    this.setState({recipe: {...this.state.recipe, [event.target.name]: event.target.value}})
  }

  handleImageChange(event) {
    this.setState({image: event.target.files[0]})
    this.setState({imageURL: URL.createObjectURL(event.target.files[0])})
  }

  SaveNewRecipe(){
    repoAPI.saveNewRecipe(this.state.recipe, this.state.image);
  }

  render() {
    return (
    <main className={this.props.classes.layout}>
      <img src={this.state.imageURL} alt="" className={this.props.classes.mainImage}/>
      <Paper className={this.props.classes.paper}>
        <Typography variant="h6" gutterBottom>
          Create a Recipe
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Recipe Name"
              fullWidth
              variant='outlined'
              value={this.state.name}
              onChange={this.handleRecipeChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sourceName"
              name="sourceName"
              label="Recipe Source"
              fullWidth
              variant='outlined'
              value={this.state.sourceName}
              onChange={this.handleRecipeChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sourceUrl"
              name="sourceUrl"
              label="Source URL"
              fullWidth
              variant='outlined'
              value={this.state.sourceUrl}
              onChange={this.handleRecipeChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12}>
            <IngredientsInput handleChange={this.handleIngredientsChange.bind(this)}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="instructions"
              name="instructions"
              label="Instructions"
              fullWidth
              multiline={true}
              rowsMax={20}
              variant='outlined'
              value={this.state.instructions}
              onChange={this.handleRecipeChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="favourite" value="yes" />}
              label="Favourite Recipe"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="public" value="yes" />}
              label="Public"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FileUploadButton className={this.props.classes.button} variant="contained" size="small" color="primary" handlefile={this.handleImageChange.bind(this)}>
              Upload
            </FileUploadButton>
          </Grid>
        </Grid>
        <div className={this.props.classes.buttons}>
            <Button className={this.props.classes.button} variant="contained" size="small" color="primary" onClick={this.SaveNewRecipe.bind(this)} >
              Save Recipe
            </Button>
        </div>
      </Paper>
    </main>
    )
  }
}

RecipeInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeInput);