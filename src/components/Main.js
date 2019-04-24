import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home';
import AllDependencies from '../components/noAuth/allDeps';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/allDependencies' component={AllDependencies}/>
        </Switch>
      </main>
    )
  }
}
