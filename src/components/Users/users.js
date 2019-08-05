import React, { Component } from 'react';
import Header from "../Header/header";

import { firebase, firebaseLooper } from "../../firebase";

class Users extends Component {

    state = {

        users: []
    }


    componentWillMount() {


        firebase.database().ref("users").once("value").then(snapshot => {


            const data = firebaseLooper(snapshot);

            console.log(data);
        })
    }

    renderUsers = () => {



    }
    render() {

        return <div>
            <Header />

            {this.renderUsers()}

        </div>
    }
}

export default Users;