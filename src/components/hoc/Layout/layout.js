import React, { Component } from "react";
import "normalize.css";
import "../../base/base.sass";

class Layout extends Component {


    render() {
        return <div>

            {this.props.children}

        </div>
    }
}

export default Layout;