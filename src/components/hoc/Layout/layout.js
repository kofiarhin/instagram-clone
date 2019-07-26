import React, { Component } from "react";
import "normalize.css";
import "../../base/base.sass";

class Layout extends Component {

    state = {

        isLoggedIn: false

    }


    componentWillMount() {

        if (sessionStorage.getItem('user')) {

            this.setState({
                loggedIn: true
            })
        }
    }


    render() {
        return <div>
            {this.props.children}
        </div>
    }
}

export default Layout;