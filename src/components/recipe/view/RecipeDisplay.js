import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Paper, Typography, Button, Divider, Grid } from '@material-ui/core'
import IngredientsAndInstructions from './IngredientsAndInstructions'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
      minWidth: 1000,
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0
  }
})

class RecipeDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  renderSource (sourceName, sourceUrl) {
    if (typeof sourceName === 'undefined' || sourceName === '') {
      return null
    }

    var sourceText = (
      <Typography variant='h6' align='center' color='textSecondary'>
        {sourceName}
      </Typography>
    )

    // If source has associated url then make it a link
    if (sourceUrl != null) {
      sourceText = (
        <Typography variant='h6' align='center' color='textSecondary' component='a' href={sourceUrl} style={{ textDecoration: 'none' }}>
          {sourceName}
        </Typography>
      )
    }

    return sourceText
  }

  render () {
    const recipeTitle = (
      <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
        {this.props.recipe.name}
      </Typography>
    )

    return (
      <Paper className={this.props.classes.paper}>
        {this.renderRedirect}
        <Grid container direction='column' spacing={24}>
          <Grid item>
            {recipeTitle}
          </Grid>
          <Grid item>
            {this.renderSource(this.props.recipe.sourceName, this.props.recipe.sourceUrl)}
          </Grid>
          <Grid item>
            <Typography display='inline' variant='h6' color='textSecondary' paragraph>
              {this.props.recipe.description}
            </Typography>
          </Grid>
          <Grid item>
            <Typography display='inline' variant='body1' color='textPrimary' paragraph>
              {(typeof this.props.recipe.prepTime !== 'undefined') && 'Prep: ' + this.props.recipe.prepTime + 'mins'} {(typeof this.props.recipe.cookTime !== 'undefined') && 'Cook: ' + this.props.recipe.cookTime + 'mins'}
            </Typography>
          </Grid>
          <Divider />
          <IngredientsAndInstructions ingredients={this.props.recipe.ingredients} instructions={this.props.recipe.instructions} />
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={this.props.classes.heading}>Notes</Typography>
                {/* <Typography className={this.props.classes.secondaryHeading}>I am an expansion panel</Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography display='inline' variant='h6' color='textSecondary' paragraph>
                  {this.props.recipe.notes}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid container item direction='row' spacing={8} justify='flex-end'>
            <Grid item>
              <Button className={this.props.classes.button} variant='contained' size='small' color='primary' onClick={this.props.handleExportRecipe}>
                Export Recipe
              </Button>
            </Grid>
            <Grid item>
              <Button className={this.props.classes.button} variant='contained' size='small' color='primary' onClick={this.props.handleEditRecipe}>
                Edit Recipe
              </Button>
            </Grid>
            <Grid item>
              <Button className={this.props.classes.button} variant='contained' size='small' color='primary' onClick={this.props.handleDeleteRecipe}>
                Delete Recipe
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper >
    )
  }
}

RecipeDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeDisplay)
