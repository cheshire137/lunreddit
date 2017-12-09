import React, { Component } from 'react'
import UserForm from './UserForm'

class Home extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <UserForm />
        </div>
      </section>
    )
  }
}

export default Home
