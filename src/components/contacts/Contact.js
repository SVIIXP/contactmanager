import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {Consumer} from '../../context'

export default class Contact extends Component {
    
    state = {
        showContactInfo: true
    }
    onShowClick = () => {
        this.setState({
            showContactInfo: !this.state.showContactInfo
        })
    }
    onDeleteClick = (id, dispatch) => {
        dispatch({
            type: 'DELETE_CONTACT',
            payload: id
        })        
    }
    onEditClick(contact,dispatch){
        dispatch({
            type: 'EDIT_CONTACT',
            payload: contact
        })
    }

  render() {
    const {id, name, email, phone} = this.props
    
    return (
        <Consumer>
            {value => {
                const { contacts, dispatch } = value
                
                return(
                <div className="card card-body mb-3">
                    <h4>{name} 
                        <i  onClick={this.onShowClick} 
                            className="fas fa-sort-down"
                            style={{cursor:"pointer"}}/>

                        
                        <i  className="fas fa-times"
                            style={{cursor:"pointer", float:"right", color:"red"}}
                            onClick={this.onDeleteClick.bind(this,id, dispatch)}/>
                        
                        <Link to={`/edit/${id}` }>
                        <i  className="fas fa-pencil-alt"
                            style={{cursor:"pointer", float:"right",  marginRight: "5px",  color:"black"}}
                            /></Link>


                    </h4>
                {this.state.showContactInfo ? 
                <ul className="list-group">
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone: {phone}</li>
                </ul> 
                :
                null}
        
              </div>)
            }}
        </Consumer>
    )
  }
}

Contact.propTypes = {
    id:PropTypes.number.isRequired, 
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
}