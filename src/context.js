import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) =>{
    switch(action.type){
        case 'DELETE_CONTACT':
            axios.delete(`https://jsonplaceholder.typicode.com/users/${action.payload}`)
            .then(res =>console.log(res))
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        case 'ADD_CONTACT':
            
            axios.post('https://jsonplaceholder.typicode.com/users', action.payload)
            .then(res => {
                state.contacts.unshift(res.data)
                return { ...state, }
            }).then(r => { action.payload.redirect('/') })
            break
            //contacts: [action.payload, ...state.contacts]
        case 'EDIT_CONTACT':
            //console.log(state, action)
            state.contacts[action.payload.id - 1] = action.payload
            //console.log(action.payload)
            //console.log(state.contacts[action.payload.id - 1])
            return {
                ...state,
                
            }
            
        default:
            return(state)

    }
}

export class Provider extends Component {

    state = {
        contacts: [
            
        ], 
        dispatch: action => this.setState(state => reducer(state,action))
    };

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => this.setState({
            contacts: res.data
        }))

    }
   
    render(){
        return(
            <Context.Provider value={this.state}>
            {this.props.children}
            </Context.Provider>
        )
    }
    
}

export const Consumer = Context.Consumer;