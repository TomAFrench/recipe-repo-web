import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'

import { RecipeAPI } from '../../../utils'
import { RecipeGrid } from '../../album'
import { RecipeInput } from '../edit'
import DeleteDialog from './DeleteDialog'
import RecipeDisplay from './RecipeDisplay'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1600 + theme.spacing.unit * 2 * 2)]: {
      width: 1600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  gridLayout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  mainImage: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: 500,
    margin: 'auto',
    marginTop: 4 * theme.spacing.unit,
    [theme.breakpoints.up(1600 + theme.spacing.unit * 2 * 2)]: {
      maxWidth: 1600
    }
  }
})

class RecipeViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recipes: [],
      recipe: { image: { path: '' } },
      editMode: false,
      dialog: false
    }
  }

  componentDidMount () {
    this.getSelectedRecipe(this.props.match.params.id)
    this.getRecipeCards()
  }

  componentWillReceiveProps (nextProps) {
    // Update the shown recipes if we move to a new page
    this.getSelectedRecipe(nextProps.match.params.id)
    this.getRecipeCards()
    this.setState({ editMode: false })
  }

  async getRecipeCards () {
    const numberOfRecipes = 4
    const response = await (new RecipeAPI()).getRandomRecipes(numberOfRecipes)
    this.setState({ recipes: response.data })
  }

  async getSelectedRecipe (recipeID) {
    const response = await (new RecipeAPI()).getRecipe(recipeID)
    const newRecipe = response.data
    this.setState({ recipe: newRecipe })
  }

  async deleteRecipe () {
    await (new RecipeAPI()).deleteRecipe(this.props.match.params.id)
    this.setState({ redirect: true })
  }

  renderRedirect () {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  editModeSwitch () {
    this.setState({ editMode: !this.state.editMode })
  }

  recipeWasEdited (newRecipe) {
    this.setState({ recipe: newRecipe })
    this.editModeSwitch()
  }

  openDialog () {
    this.setState({ dialog: true })
  }

  closeDialog () {
    this.setState({ dialog: false })
  }

  render () {
    const recipeImage = <img
      className={this.props.classes.mainImage}
      src={typeof this.state.recipe.image !== 'undefined' && process.env.REACT_APP_API_URL + '/' + this.state.recipe.image.path}
      alt=''
    />

    const recipeDisplay = ('name' in this.state.recipe
      ? <RecipeDisplay
        recipe={this.state.recipe}
        handleEditRecipe={this.editModeSwitch.bind(this)}
        handleDeleteRecipe={this.openDialog.bind(this)}
      />
      : ''
    )

    const recipeEditor = <RecipeInput
      initalRecipe={this.state.recipe}
      initalImage={typeof this.state.recipe.image !== 'undefined'
        ? process.env.REACT_APP_API_URL + '/' + this.state.recipe.image.path : undefined}
      saveAction={this.recipeWasEdited.bind(this)}
    />

    return (
      <React.Fragment>
        <DeleteDialog
          open={this.state.dialog}
          recipeName={this.state.recipe.name}
          confirmAction={this.deleteRecipe.bind(this)}
          closeAction={this.closeDialog.bind(this)}
        />
        {this.renderRedirect()}
        <Grid container spacing={24}>
          <div className={this.props.classes.layout}>
            {!this.state.editMode && recipeImage}
            {this.state.editMode ? recipeEditor : recipeDisplay}
          </div>
        </Grid>
        <div className={this.props.classes.gridLayout}>
          <RecipeGrid recipes={this.state.recipes} />
        </div>
      </React.Fragment>
    )
  }
}

RecipeViewer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeViewer)
