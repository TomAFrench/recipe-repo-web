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
import axios from 'axios';
import FileUploadButton from '../common/FileUploadButton';

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
        source_name: "",
        source_url: "",
        ingredients: {},
        instructions: "",
      },
      image: {}
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSourceNameChange = this.handleSourceNameChange.bind(this);
    this.handleSourceURLChange = this.handleSourceURLChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleInstructionsChange = this.handleInstructionsChange.bind(this);

    this.SaveNewRecipe = this.SaveNewRecipe.bind(this);
  }

  handleNameChange(event) {
    this.setState({recipe: {...this.state.recipe, name: event.target.value}})
  }

  handleSourceNameChange(event) {
    this.setState({recipe: {...this.state.recipe, source_name: event.target.value}})
  }

  handleSourceURLChange(event) {
    this.setState({recipe: {...this.state.recipe, source_url: event.target.value}})
  }

  handleIngredientsChange(ingredients) {
    this.setState({recipe: {...this.state.recipe, ingredients: ingredients}}, () => console.log(this.state.recipe.ingredients))
  }

  handleInstructionsChange(event) {
    this.setState({recipe: {...this.state.recipe, instructions: event.target.value}})
  }

  handleImageChange(event) {
    this.setState({image: event.target.files[0]})
    this.setState({imageURL: URL.createObjectURL(event.target.files[0])})
  }

  SaveNewRecipe(){
    console.log(this.state.recipe);
    let data = new FormData();
    Object.keys(this.state.recipe).forEach(key => data.append(key, this.state.recipe[key]));
    data.set("ingredients", JSON.stringify(Object.values(this.state.recipe.ingredients)));
    data.append('image', this.state.image);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
     };
    axios.post(process.env.REACT_APP_API_URL + '/recipes', data, config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
    <main className={this.props.classes.layout}>
      <img src={this.state.imageURL} className={this.props.classes.mainImage}/>
      <Paper className={this.props.classes.paper}>
        <Typography variant="h6" gutterBottom>
          Create a Recipe
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id="recipeName"
              name="recipeName"
              label="Recipe Name"
              fullWidth
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sourceName"
              name="sourceName"
              label="Recipe Source"
              fullWidth
              value={this.state.source_name}
              onChange={this.handleSourceNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sourceUrl"
              name="sourceUrl"
              label="Source URL"
              fullWidth
              value={this.state.source_URL}
              onChange={this.handleSourceURLChange}
            />
          </Grid>
          <Grid item xs={12}>
            <IngredientsInput handleChange={this.handleIngredientsChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="Instructions"
              name="Instructions"
              label="Instructions"
              fullWidth
              multiline={true}
              rows={2}
              value={this.state.instructions}
              onChange={this.handleInstructionsChange}
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
            <Button className={this.props.classes.button} variant="contained" size="small" color="primary" onClick={this.SaveNewRecipe} >
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