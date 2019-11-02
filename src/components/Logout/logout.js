import React, { Component } from "react";

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