import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Paper, Button, Grid, Typography, TextField } from '@material-ui/core'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import FileUploadButton from './FileUploadButton'
import IngredientsInput from './ingredients/IngredientsInput'
import { RecipeAPI } from '../../../utils'
import InstructionsInput from './InstructionsInput'
import ScrapeDialog from './ScrapeDialog'

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 2 * 2)]: {
      width: 1100,
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
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0
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
        open: false,
        recipe: {
          name: '',
          sourceName: '',
          sourceUrl: '',
          ingredients: [],
          instructions: []
        }
      }
    }
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

  async handleScrapeRecipe (url) {
    const apiWrapper = new RecipeAPI()
    const res = await apiWrapper.scrapeURL(url)
    this.setState({ recipe: res.data, open: false })
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

  async saveRecipe () {
    // Take deep copy of ingredient and remove empty array elements
    const recipe = JSON.parse(JSON.stringify(this.state.recipe))
    recipe.ingredients.pop()
    recipe.instructions.pop()

    // Check if updating or making a new recipe
    var response
    const apiWrapper = new RecipeAPI()
    if ('initalRecipe' in this.props) {
      response = await apiWrapper.updateRecipe(recipe)
    } else {
      response = await apiWrapper.saveNewRecipe(recipe)
    }

    if (response.status !== 200) {
      console.log(response)
    }

    if (response.status === 200 && typeof (this.state.image) !== 'undefined') {
      apiWrapper.uploadImage(response.data.id, this.state.image)
    }

    if (response.status === 200 && this.props.saveAction) {
      this.props.saveAction(recipe)
    } else {
      console.log(response)
    }
  }

  render () {
    var imageUrl
    if (typeof this.state.imageURL === 'undefined' && 'initalRecipe' in this.props && this.state.recipe.images.length > 0) {
      imageUrl = process.env.REACT_APP_API_URL + '/recipes/' + this.state.recipe._id + '/images/' + this.state.recipe.images[0].name
    } else if (typeof this.state.imageURL !== 'undefined') {
      imageUrl = this.state.imageURL
    }
    return (
      <main className={this.props.classes.layout}>
        <img
          src={imageUrl}
          alt=''
          className={this.props.classes.mainImage}
        />
        <ScrapeDialog
          open={this.state.open}
          handleClose={() => { this.setState({ open: false }) }}
          onConfirmation={this.handleScrapeRecipe.bind(this)}
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
                onChange={(event) => { this.handleRecipeChange(event) }}
              />
            </Grid>
            <Grid item xs={12}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={this.props.classes.heading}>Description</Typography>
                  {/* <Typography className={this.props.classes.secondaryHeading}>I am an expansion panel</Typography> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TextField
                    id='description'
                    name='description'
                    label='Add a description of the recipe'
                    fullWidth
                    multiline
                    rowsMax={20}
                    variant='outlined'
                    value={this.state.recipe.description}
                    onChange={(event) => { this.handleRecipeChange(event) }}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={this.props.classes.heading}>Ingredients</Typography>
                  {/* <Typography className={this.props.classes.secondaryHeading}>I am an expansion panel</Typography> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <IngredientsInput
                    ingredients={this.state.recipe.ingredients}
                    updateIngredients={(ingredients) => {
                      this.setState({ recipe: {
                        ...this.state.recipe,
                        ingredients: ingredients } })
                    }}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={this.props.classes.heading}>Instructions</Typography>
                  {/* <Typography className={this.props.classes.secondaryHeading}>I am an expansion panel</Typography> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <InstructionsInput
                    instructions={this.state.recipe.instructions}
                    updateInstructions={(instructions) => {
                      this.setState({ recipe: {
                        ...this.state.recipe,
                        instructions: instructions } })
                    }}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={this.props.classes.heading}>Notes</Typography>
                  {/* <Typography className={this.props.classes.secondaryHeading}>I am an expansion panel</Typography> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TextField
                    id='notes'
                    name='notes'
                    label='Add some notes'
                    fullWidth
                    multiline
                    rowsMax={20}
                    variant='outlined'
                    value={this.state.recipe.notes}
                    onChange={(event) => { this.handleRecipeChange(event) }}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={this.props.classes.heading}>Details</Typography>
                  {/* <Typography className={this.props.classes.secondaryHeading}>I am an expansion panel</Typography> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id='sourceName'
                        name='sourceName'
                        label='Recipe Source'
                        fullWidth
                        variant='outlined'
                        value={this.state.recipe.sourceName}
                        onChange={(event) => { this.handleRecipeChange(event) }}
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
                        onChange={(event) => { this.handleRecipeChange(event) }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id='prepTime'
                        name='prepTime'
                        label='Preparation Time (minutes)'
                        fullWidth
                        type='number'
                        variant='outlined'
                        value={this.state.recipe.prepTime}
                        onChange={(event) => { this.handleRecipeChange(event) }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id='cookTime'
                        name='cookTime'
                        label='Cooking Time (minutes)'
                        fullWidth
                        type='number'
                        variant='outlined'
                        value={this.state.recipe.cookTime}
                        onChange={(event) => { this.handleRecipeChange(event) }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id='servings'
                        name='servings'
                        label='Number of servings'
                        fullWidth
                        variant='outlined'
                        value={this.state.recipe.servings}
                        onChange={(event) => { this.handleRecipeChange(event) }}
                      />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={this.props.classes.heading}>Tags</Typography>
                  {/* <Typography className={this.props.classes.secondaryHeading}>I am an expansion panel</Typography> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TextField
                    id='keywords'
                    name='keywords'
                    label='Add some keywords to make this recipe easier to find'
                    fullWidth
                    multiline
                    rowsMax={20}
                    variant='outlined'
                    value={this.state.recipe.keywords}
                    onChange={(event) => { this.handleRecipeChange(event) }}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>

            </Grid>
          </Grid>
          <div className={this.props.classes.buttons}>
            <FileUploadButton className={this.props.classes.button} id='importButton' variant='contained' size='small' color='primary' fileType='application/json' handlefile={this.handleImportRecipe.bind(this)}>
              Import Recipe
            </FileUploadButton>
            { typeof this.props.initalRecipe === 'undefined' && <Button className={this.props.classes.button} id='importButton' variant='contained' size='small' color='primary' fileType='application/json' onClick={() => { this.setState({ open: true }) }}>
              Scrape Recipe
            </Button>
            }
            <FileUploadButton className={this.props.classes.button} id='imageButton' variant='contained' size='small' color='primary' fileType='image/*' handlefile={this.handleImageChange.bind(this)}>
              Upload Image
            </FileUploadButton>
            <Button className={this.props.classes.button} variant='contained' size='small' color='primary' onClick={() => { this.saveRecipe() }} >
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
