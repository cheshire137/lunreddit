import React, { Component } from 'react'
import UserForm from './UserForm'

class Home extends Component {
  render() {
    return (
      <div>
        <section className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Lunreddit</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <UserForm />
          </div>
        </section>
      </div>
    )
  }
}

export default Home
