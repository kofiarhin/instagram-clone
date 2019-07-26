import React, { Component } from "react";
import { firebase } from "../../firebase";

class Logout extends Component {


    logoutUser = () => {

        sessionStorage.clear();
        this.props.history.push('/login');
    }
    render() {

        return <div> {this.logoutUser()} </div>

    }
}

export default Logout;