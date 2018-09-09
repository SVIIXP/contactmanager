import React, { Component } from 'react'
import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup';


export default class AddContact extends Component {

  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value })


  onSubmit = (contact, dispatch, e) => {

    e.preventDefault()

    if (contact.name === "") {
      this.setState({ errors: { name: "Name is required" } })
      return
    }
    if (contact.email === "") {
      this.setState({ errors: { email: "Email is required" } })
      return
    }
    if (contact.phone === "") {
      this.setState({ errors: { phone: "Phone is required" } })
      return
    }

    dispatch({
      type: 'ADD_CONTACT',
      payload: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        redirect:  this.props.history.push
      }
    })

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {},
    })

    //this.props.history.push("/")
  }
 
  render() {
    const { name, email, phone, errors } = this.state
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className="card mb-3">
              <div className="card-header">
                Add Contact
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, this.state, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder={`Enter name...`}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    value={email}
                    placeholder={`Enter "email"...`}
                    type="email"
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    placeholder={`Enter phone...`}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input type="submit" value="Add Contact"
                    className="btn btn-light btn-block" />

                </form>
              </div>
            </div>
          )

        }}
      </Consumer>
    )
  }
}


