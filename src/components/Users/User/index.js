import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import Header from "../../Header/header";
import UserData from "../../widgets/userData/userData";


class User extends Component {

    state = {

        user: []
    }


    componentWillMount() {

        const id = this.props.match.params.id;

        //fetch data from firebase
        firebase.database().ref(`users/${id}`).once("value").then(snapshot => {

            // console.log(snapshot.val());

            const user = snapshot.val();
            this.setState({
                user
            })
        })


    }


    renderUser = () => {

        console.log(this.state)

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