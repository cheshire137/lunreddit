import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import UserView from './components/UserView'
import 'bulma/css/bulma.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/user/:username/after/:after/:count/year/:year" component={UserView} />
          <Route path="/user/:username/before/:before/:count/year/:year" component={UserView} />
          <Route path="/user/:username/year/:year" component={UserView} />
        </div>
      </Router>
    )
  }
}

export default App
