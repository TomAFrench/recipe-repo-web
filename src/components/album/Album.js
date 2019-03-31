import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { Button, Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { RecipeAPI } from '../../utils'
import { RecipeGrid } from '.'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
})

class Album extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recipes: []
    }
    this.getRecipes()
  }

  async getRecipes () {
    const response = await (new RecipeAPI()).getRecipes()
    this.setState({ recipes: response.data })
  }

  render () {
    return (
      <main>
        {/* Hero unit */}
        <div className={this.props.classes.heroUnit}>
          <div className={this.props.classes.heroContent}>
            <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
              Your Recipes
            </Typography>
            <div className={this.props.classes.heroButtons}>
              <Grid container spacing={16} justify='center'>
                <Grid item>
                  <Button variant='contained' color='primary' component={NavLink} to='/create_recipe'>
                    Create new recipe!
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' color='primary' component={NavLink} to='/random'>
                    I'm feeling lucky!
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        {/* End hero unit */}
        <div className={this.props.classes.layout}>
          <RecipeGrid recipes={this.state.recipes} />
        </div>
      </main>
    )
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Album)
