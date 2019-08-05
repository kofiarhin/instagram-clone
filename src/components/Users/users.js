import React, { Component } from 'react';
import Header from "../Header/header";

import { firebase, firebaseLooper } from "../../firebase";

class Users extends Component {

    state = {

        users: []
    }


    componentWillMount() {


        firebase.database().ref("users").once("value").then(snapshot => {


            const users = firebaseLooper(snapshot);

            this.setState({
                users
            })
        })
    }

    renderUsers = () => {

        const users = this.state.users;

        return this.state.users ? <div>  <Users data={this.state.users} />  </div> : null;
    }
    render() {

        return <div>
            <Header />

            {this.renderUsers()}

        </div>
    }
}

export default Users;