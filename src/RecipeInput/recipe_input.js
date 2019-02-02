import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import axios from 'axios';

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
});

class RecipeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: "",
        source_name: "",
        source_url: "",
        ingredients: "",
        instructions: ""
      }
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

  handleIngredientsChange(event) {
    this.setState({recipe: {...this.state.recipe, ingredients: event.target.value}})
  }

  handleInstructionsChange(event) {
    this.setState({recipe: {...this.state.recipe, instructions: event.target.value}})
  }

  SaveNewRecipe(){
    console.log({recipe: this.state.recipe})
    axios.post('http://localhost:3000/recipes', {recipe: this.state.recipe})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });;
  }

  render() {return (
    <main className={this.props.classes.layout}>
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
            <TextField
              required
              id="ingredients"
              name="ingredients"
              label="Ingredients"
              fullWidth
              multiline={true}
              rows={2}
              value={this.state.ingredients}
              onChange={this.handleIngredientsChange}
            />
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
        </Grid>
        <div className={this.props.classes.buttons}>
            <Button className={this.props.classes.button} variant="contained" size="small" color="primary" onClick={this.SaveNewRecipe} /*component={NavLink} to={"/hello"}*/ >
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