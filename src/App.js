import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import RandomRecipe from './components/common/RandomRecipe'
import { Album } from './components/album'
import { RecipeViewer } from './components/recipe/view'
import { RecipeInput } from './components/recipe/edit'
import { PrimarySearchAppBar, MyFooter } from './components/frame'

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
      <BrowserRouter>
        <div>
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
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(styles)(App)
