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
          <section className="hero is-link">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Lunreddit</h1>
              </div>
            </div>
          </section>
          <Route exact path="/" component={Home} />
          <Route path="/user/:username" component={UserView}/>
        </div>
      </Router>
    )
  }
}

export default App
