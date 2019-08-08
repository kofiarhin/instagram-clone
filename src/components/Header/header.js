import React, { Component } from "react";
import { firebase } from "../../firebase";
import { Link } from "react-router-dom";
import "./header.sass"

class Header extends Component {


    state = {

        user: []
    }

    componentWillMount() {

        firebase.database().ref(`users/${sessionStorage.getItem("userId")}`).once("value").then(snapshot => {

            this.setState({

                user: snapshot.val()
            })
        })

    }

    renderLinks = () => {

        return sessionStorage.getItem('user') ?

            <div className="links">
                <Link to="/profile"> Profile </Link>
                <Link to="/create"> Create </Link>
                <Link to="/users"> Users </Link>
                <Link to="/logout"> Logout </Link>
            </div>

            : <div className="links">

                <Link to="/login"> Login </Link>
                <Link to="/register"> Register </Link>
            </div>;


    }


    renderHeader = () => {


        return (

            <header className="main-header">
                <div className="container">

                    <h1 className="logo"><Link to="/"> Escogram </Link></h1>
                    <nav>
                        {this.renderLinks()}
                    </nav>
                </div>
            </header >

        )
    }


    render() {

        return <div> {this.renderHeader()}</div>

    }
}

export default Header;