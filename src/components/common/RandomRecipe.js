import React from 'react'
import { Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { RecipeAPI } from '../../utils'

const styles = () => ({})

class RandomRecipe extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.getRandomRecipe()
  }

  async getRandomRecipe () {
    const response = await (new RecipeAPI()).getRandomRecipes(1)
    this.setState({ recipe_id: response.data[0]._id })
  }

  renderRedirect () {
    if ('recipe_id' in this.state) {
      return <Redirect to={'/recipe/' + this.state.recipe_id} />
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.renderRedirect()}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(RandomRecipe)
