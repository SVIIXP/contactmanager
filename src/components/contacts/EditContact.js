import React, { Component } from 'react'
import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios'

export default class EditContact extends Component {

  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  }

  componentDidMount(){
    console.log(this.props.match.params.id)
    axios.get(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`)
    .then(res => this.setState({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
    }))

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
      type: 'EDIT_CONTACT',
      payload: {
        id: contact.id,  
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        
      }
    })

    

    this.props.history.push("/")
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
              <h1 className="display-4 mb-2">
                  <span className="text-danger">Edit Contact</span> 
                  </h1> 
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
                  <input type="submit" value="Update Contact"
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


