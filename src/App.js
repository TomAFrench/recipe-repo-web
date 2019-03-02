import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Album from './Library/Album';
import RecipeViewer from './Recipe/RecipeViewer';
import RecipeInput from './RecipeInput/RecipeInput';
import PrimarySearchAppBar from './common/Appbar';
import MyFooter from './common/Footer';

class App extends Component {

  render () {
    return (
      <React.Fragment>
        <CssBaseline />
        <PrimarySearchAppBar />
        <Route exact path="/" component={Album} />
        <Route path="/recipe/:id" component={RecipeViewer} />
        <Route exact path="/create_recipe" component={RecipeInput} />
        <MyFooter/>
      </React.Fragment>
    );
  };
}


export default App;
