import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import Contact from './Contact'
import {Consumer} from '../../context'


export default class Contacts extends Component {
    constructor(){
        super();
        this.state = null
    }

    componentWillReceiveProps(){
        console.log('will recieve props')
    }
  render() {
      return(<Consumer>
          {value => {
              return(
              <React.Fragment>
                  <h1 className="display-4 mb-2">
                  <span className="text-danger">Contact</span> List
                  </h1> 
                {value.contacts.map(
                    (contact)=>
                    (<Contact key={contact.id}
                    id = {contact.id}
                    name = {contact.name}
                    email={contact.email}
                    phone={contact.phone}
                    />))}
              </React.Fragment>)
          }}
      </Consumer>)
    
  }
}
