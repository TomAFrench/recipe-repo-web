import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import { saveAs } from 'file-saver'

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
    maxWidth: '100%',
    maxHeight: 500,
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
      recipe: { images: [{ name: '' }] },
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

  exportRecipe () {
    var fileName = this.state.recipe.URISafeName + '.json'

    // Create a blob of the data
    var fileToSave = new window.Blob([JSON.stringify(this.state.recipe, undefined, 2)], {
      type: 'application/json',
      name: fileName
    })

    console.log(fileToSave)

    // Save the file
    saveAs(fileToSave, fileName)
  }

  render () {
    const recipeImage = <img
      className={this.props.classes.mainImage}
      src={typeof this.state.recipe.images !== 'undefined' && this.state.recipe.images.length > 0 && process.env.REACT_APP_API_URL + '/recipes/' + this.state.recipe._id + '/images/' + this.state.recipe.images[0].name}
      alt=''
    />

    const recipeDisplay = ('name' in this.state.recipe
      ? <RecipeDisplay
        recipe={this.state.recipe}
        handleEditRecipe={this.editModeSwitch.bind(this)}
        handleDeleteRecipe={this.openDialog.bind(this)}
        handleExportRecipe={this.exportRecipe.bind(this)}
      />
      : ''
    )

    const recipeEditor = <RecipeInput
      initalRecipe={this.state.recipe}
      initalImage={typeof this.state.recipe.images !== 'undefined' && this.state.recipe.images.length > 0
        ? process.env.REACT_APP_API_URL + '/' + this.state.recipe._id + '/images/' + this.state.recipe.images[0].name : undefined}
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
        <Grid container className={this.props.classes.layout} spacing={24} direction='column' alignContent='center' alignItems='center'>
          <Grid item>
            {!this.state.editMode && recipeImage}
          </Grid>
          <Grid item>
            {this.state.editMode ? recipeEditor : recipeDisplay}
          </Grid>
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
