import React, { Component } from "react";
import logo from '../logo.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Navbar extends Component {
    render(){
        return(
            <React.Fragment>
                <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand">
                    <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="" />
                </a>
                </nav>
            </React.Fragment>
        );
    }
}

export default Navbar;