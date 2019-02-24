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

class IngredientsInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      no_ingredients: 1,
    }
  }

  handleAddIngredient(event) {
    this.setState({no_ingredients: this.state.no_ingredients+1});
  }

  render() {
    const ingredientEntrys = [...Array(this.state.no_ingredients).keys()].map(() => <IngredientEntry/> )
    return (
    <Grid container spacing={24}>
      {ingredientEntrys}
      <Fab color="primary" aria-label="Add" size="small" className={this.props.classes.fab} onClick={this.handleAddIngredient.bind(this)}>
        <AddIcon />
      </Fab>
    </Grid>
  )
  }
}

IngredientEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientsInput);