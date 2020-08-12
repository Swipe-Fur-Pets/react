import React, { Component } from 'react';
import Home from './home.js';
import Authentication from './authentication.js';
import Preferences from './preferences.js';
import Message from './message.js'
import { Switch, Route } from 'react-router-dom';


class Main extends Component {

  render() {
   
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Authentication} /> 
          <Route path='/preferences' component={Preferences} />
          <Route path='/home' component={Home} />
          <Route path='/message' component={Message} />
        </Switch>
      </div>
    );
  }
}


export default Main;