import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../firebase";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
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


    renderUsername = () => {

        // const id = sessionStorage.getItem("userId");

        // //fetch user from database

        // // firebase.database().ref(`users/${id}`).once('value').then(snapshot => {

        // //     const userData = snapshot.val();

        // //     console.log(userData.username);
        // // })
        // // return "kofi arhin"
    }

    renderLinks = () => {

        const userData = this.state.user;

        const username = userData.username;

        // console.log(username);

        return sessionStorage.getItem('user') ?

            <div className="links">

                {/* todo change to username */}
                <Link to="/profile" style={{
                    textTransform: "capitalize"
                }}> {username} </Link>
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


        return this.state.user ? <header className="main-header">
            <div className="container">

                <h1 className="logo"><Link to="/"> Escogram </Link></h1>

                <FontAwesome name="bars" className="menu" />

                <nav>
                    {this.renderLinks()}
                </nav>
            </div>
        </header > : null;
    }


    render() {

        return <div> {this.renderHeader()}</div>

    }
}

export default Header;