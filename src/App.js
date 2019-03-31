import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Album from './Library/Album'
import RecipeViewer from './Recipe/RecipeViewer'
import RecipeInput from './RecipeInput/RecipeInput'
import RandomRecipe from './common/RandomRecipe'
import PrimarySearchAppBar from './common/Appbar'
import MyFooter from './common/Footer'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  app: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  contentWrap: {
    flex: 1
  }
})

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={this.props.classes.app}>
          <PrimarySearchAppBar />
          <div className={this.props.classes.contentWrap}>
            <Route exact path='/' component={Album} />
            <Route path='/recipe/:id' component={RecipeViewer} />
            <Route exact path='/create_recipe' component={RecipeInput} />
            <Route exact path='/random' component={RandomRecipe} />
          </div>
          <MyFooter />
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(App)
