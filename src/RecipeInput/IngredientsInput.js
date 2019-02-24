import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import IngredientEntry from './IngredientEntry';

const styles = (theme) => ({
  fab: {
    margin: theme.spacing.unit,
  },
});

const ingredientInitialState = {
  quantity: 0,
  unit: "",
  ingredient: "",
}

class IngredientsInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ingredientKeys: [],
      ingredients: {}
    }
  }

  componentDidMount(){
    this.handleAddIngredient()
  }

  /**
   * Generates a new guaranteed unique key for an ingredient
   * 
   * Keys are generated by incrementing the last ingredient's key
   * Previous ingredients may be deleted so keys may become non-contiguous
   */
  getNextKey(){
    // If no ingredients, can just give key of 1
    if (this.state.ingredientKeys.length === 0) {
      return 1
    } else {
      // Give key
      return this.state.ingredientKeys[this.state.ingredientKeys.length-1] + 1;
    }
  }

  handleAddIngredient(event) {
    const newKey = this.getNextKey()
    this.setState({ingredientKeys: [...this.state.ingredientKeys, newKey]});
    // Initialise the state of the new ingredient
    this.setState({ingredients: {...this.state.ingredients, [newKey]: ingredientInitialState}});
  }
  
  /**
   * Deletes the ingredient with the given key
   * @param {int} key - key of the ingredient to delete
   * @param {*} event - unused
   */
  handleDeleteIngredient(key, event) {
    // Filters out ingredient based on its key value
    const filteredIngredientKeys = this.state.ingredientKeys.filter((val) => val !== key);
    this.setState({ingredientKeys: filteredIngredientKeys});

    const state = {...this.state.ingredients};
    delete state[key]
    this.setState({ingredients: state});
  }

  handleChange(key, name, value) {
    const keyString = key.toString()
    const oldIngredientEntry = this.state.ingredients[keyString]
    const newIngredientEntry = {...oldIngredientEntry, [name]: value}
    this.setState({ingredients: {...this.state.ingredients, [keyString]: newIngredientEntry}}, () => console.log(this.state.ingredients));
  }

  render() {
    const ingredientEntries = this.state.ingredientKeys.map((key) => 
      <IngredientEntry  key={key}
                        ingredientKey={key}
                        values={this.state.ingredients[key]}
                        handleChange={this.handleChange.bind(this, key)}
                        onClick={this.handleDeleteIngredient.bind(this, key)}
                        />
    )
    
    return (
    <Grid container spacing={24}>
      {ingredientEntries}
      <Fab color="primary" aria-label="Add" size="small" className={this.props.classes.fab} onClick={this.handleAddIngredient.bind(this)}>
        <AddIcon />
      </Fab>
    </Grid>
  )
  }
}

IngredientsInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientsInput);