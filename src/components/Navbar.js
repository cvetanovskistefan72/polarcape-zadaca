import React, { Component } from 'react'
import Hello from './Hello'

export default class Navbar extends Component {


    handleLogOut = ()=>{
        localStorage.removeItem("name")
        this.props.handlePush("login")
    }

    render() {
        return (
            <div className="navbar">
               <Hello name={this.props.name}/>
                 <ul>
                    <li>Cards</li>
                    <li className="navbar-logout" onClick={this.handleLogOut}>Log out</li>
                </ul>
             
            </div>
        )
    }
}
