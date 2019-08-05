import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import Header from "../../Header/header";
import UserData from "../../widgets/userData/userData";


class User extends Component {

    state = {

        user: []
    }


    componentWillMount() {


        const username = this.props.match.params.username;

        firebase.database().ref("users").orderByChild("username").equalTo(username).limitToFirst(1).once("value").then(snapshot => {

            const data = firebaseLooper(snapshot);

            const user = data[0];

            if (user) {

                this.setState({

                    user
                })
            }
        })

    }


    renderUser = () => {


        return this.state.user ? <div> <UserData userData={this.state.user} /> </div> : null;
    }




    render() {


        return <div>

            <Header />
            {this.renderUser()}

        </div>
    }

}

export default User;