import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const styles = (theme) => ({
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

class IngredientEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  validate(name, value) {
    if (name === "quantity") {
      value = Number.parseFloat(value)
      if (Number.isNaN(value) || value < 0){
        return false
      }
    }
    return true
  }
  handleValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (this.validate(name, value)) {
      this.props.handleChange(name,value);
    }
  }

  render() {
    return (
    <React.Fragment>
      <Grid item xs={2}>
        <TextField
          id="quantity"
          name="quantity"
          label="Quantity"
          fullWidth
          type="number"
          autoComplete="fname"
          variant='outlined'
          value={this.props.values.quantity}
          onChange={this.handleValueChange}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          id="unit"
          name="unit"
          label="Unit"
          fullWidth
          variant='outlined'
          value={this.props.values.unit}
          onChange={this.handleValueChange}
        />
      </Grid>
      <Grid item xs={6} >
        <TextField
          required
          id="ingredient"
          name="ingredient"
          label="ingredient"
          variant='outlined'
          value={this.props.values.ingredient}
          onChange={this.handleValueChange}
        />
      </Grid>
      {/* <Grid item xs={4}>
        <TextField
          id="note"
          name="note"
          label="Note"
          autoComplete="fname"
          value={this.state.note}
          onChange={this.handleNoteChange}
        />
      </Grid> */}
      {(this.props.lastItem === true)
          ? <Fab color="primary" aria-label="Add" size="small" className={this.props.classes.button} onClick={this.props.onClick} >
              <AddIcon />
            </Fab>
          : <IconButton className={this.props.classes.button} aria-label="Delete" onClick={this.props.onClick}>
              <DeleteIcon />
            </IconButton>
      }
    </React.Fragment>
  )
  }
}

IngredientEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientEntry);