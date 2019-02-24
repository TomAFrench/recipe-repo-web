import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

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

class IngredientEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: 0,
      unit: "",
      note: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleQuantityChange(event) {
    this.setState({quantity: event.target.value})
  }

  handleUnitChange(event) {
    this.setState({unit: event.target.value})
  }

  handleNoteChange(event) {
    this.setState({note: event.target.value})
  }

  render() {return (
    <Grid container spacing={24}>
      <Grid item xs={2}>
        <TextField
          required
          id="quantity"
          name="recipeName"
          label="Quantity"
          fullWidth
          type="number"
          autoComplete="fname"
          value={this.state.quantity}
          onChange={this.handleQuantityChange}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          required
          id="unit"
          name="city"
          label="Unit"
          fullWidth
          value={this.state.unit}
          onChange={this.handleUnitChange}
        />
      </Grid>
      <Grid item xs={4} >
        <TextField
          required
          id="name"
          name="name"
          label="Ingredient"
          value={this.state.name}
          onChange={this.handleNameChange}
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
    </Grid>
  )
  }
}

IngredientEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientEntry);