import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import base64Img from 'base64-img'

import { Paper, Button, Grid, Typography, TextField } from '@material-ui/core'

import FileUploadButton from './FileUploadButton'
import IngredientsInput from './ingredients/IngredientsInput'
import { RecipeAPI } from '../../../utils'

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  mainImage: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: 500,
    margin: 'auto',
    marginTop: 4 * theme.spacing.unit,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      maxWidth: 1000
    }
  }

})

class RecipeInput extends React.Component {
  constructor (props) {
    super(props)
    if (this.props.initalRecipe) {
      this.state = {
        recipe: this.props.initalRecipe
      }
    } else {
      this.state = {
        recipe: {
          name: '',
          sourceName: '',
          sourceUrl: '',
          ingredients: [],
          instructions: ''
        },
        image: {}
      }
    }

    console.log(this.state)
  }

  handleImportRecipe (event) {
    var fileReader = new window.FileReader()
    fileReader.onload = (event) => {
      this.setState({ recipe: JSON.parse(event.target.result) }, () => {
        console.log(this.state.recipe)
      })
    }
    fileReader.readAsText(event.target.files[0])
  }

  handleIngredientsChange (ingredients) {
    this.setState({
      recipe: {
        ...this.state.recipe,
        ingredients: ingredients
      }
    }, () => console.log(this.state))
  }

  handleRecipeChange (event) {
    this.setState({
      recipe: {
        ...this.state.recipe,
        [event.target.name]: event.target.value
      }
    })
  }

  handleImageChange (event) {
    this.setState({
      image: event.target.files[0],
      imageURL: URL.createObjectURL(event.target.files[0])
    })
  }

  saveRecipe () {
    // Check if updating or making a new recipe
    var saveAction
    const apiWrapper = new RecipeAPI()
    if ('initalRecipe' in this.props) {
      saveAction = apiWrapper.updateRecipe.bind(apiWrapper)
    } else {
      saveAction = apiWrapper.saveNewRecipe.bind(apiWrapper)
    }
    saveAction(this.state.recipe, this.state.image).then((res) => {
      if (res.status === 200 && this.props.saveAction) {
        this.props.saveAction(this.state.recipe, this.state.image)
      }
    })
  }

  render () {
    return (
      <main className={this.props.classes.layout}>
        <img
          src={this.state.imageURL || process.env.REACT_APP_API_URL + '/recipes/' + this.state.recipe._id + '/images/' + this.state.recipe.images[0].name}
          alt=''
          className={this.props.classes.mainImage}
        />
        <Paper className={this.props.classes.paper}>
          <Typography variant='h6' gutterBottom>
            Create a Recipe
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id='name'
                name='name'
                label='Recipe Name'
                fullWidth
                variant='outlined'
                value={this.state.recipe.name}
                onChange={this.handleRecipeChange.bind(this)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='sourceName'
                name='sourceName'
                label='Recipe Source'
                fullWidth
                variant='outlined'
                value={this.state.recipe.sourceName}
                onChange={this.handleRecipeChange.bind(this)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='sourceUrl'
                name='sourceUrl'
                label='Source URL'
                fullWidth
                variant='outlined'
                value={this.state.recipe.sourceUrl}
                onChange={this.handleRecipeChange.bind(this)}
              />
            </Grid>
            <Grid item xs={12}>
              <IngredientsInput
                ingredients={this.state.recipe.ingredients}
                updateIngredients={this.handleIngredientsChange.bind(this)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='instructions'
                name='instructions'
                label='Instructions'
                fullWidth
                multiline
                rowsMax={20}
                variant='outlined'
                value={this.state.recipe.instructions}
                onChange={this.handleRecipeChange.bind(this)}
              />
            </Grid>
          </Grid>
          <div className={this.props.classes.buttons}>
            <FileUploadButton className={this.props.classes.button} id='importButton' variant='contained' size='small' color='primary' fileType='application/json' handlefile={this.handleImportRecipe.bind(this)}>
              Import Recipe
            </FileUploadButton>
            <FileUploadButton className={this.props.classes.button} id='imageButton' variant='contained' size='small' color='primary' fileType='image/*' handlefile={this.handleImageChange.bind(this)}>
              Upload Image
            </FileUploadButton>
            <Button className={this.props.classes.button} variant='contained' size='small' color='primary' onClick={this.saveRecipe.bind(this)} >
              Save Recipe
            </Button>
          </div>
        </Paper>
      </main>
    )
  }
}

RecipeInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeInput)
