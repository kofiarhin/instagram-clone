import React, { Component } from "react";
import { firebase } from "../../../firebase";
import Header from "../../Header/header";
import UserData from "../../widgets/userData/userData";
import UserPost from "../../widgets/User/userPost";


class User extends Component {

    state = {

        user: [],
        userId: this.props.match.params.id
    }


    componentWillMount() {

        const id = this.props.match.params.id;

        //fetch data from firebase
        firebase.database().ref(`users/${id}`).once("value").then(snapshot => {

            // console.log(snapshot.val());
            const user = snapshot.val();
            this.setState({
                user,
                userId: id
            })
        })


    }


    renderUser = () => {

        // console.log(this.state)
        return this.state.user ?
            <div className="container">
                <UserData type="main" userData={this.state.user} />
            </div> : null;
    }


    renderUserPost = () => {

        const userId = this.state.userId;

        return this.state.userId ? <UserPost userId={this.state.userId} /> : null;


    }




    render() {

        // console.log(this.state.user);
        return <div>
            <Header />
            <div className="container">
                {this.renderUser()}
                {this.renderUserPost()}

            </div>
        </div>
    }

}

export default User;