import React, { Component } from "react";
import UserProfile from "../widgets/userProfile/userProfile";
import { firebase, firebaseLooper } from "../../firebase";
import Header from "../Header/header";
import UserPost from "../widgets/userPosts/userPosts";


class Profile extends Component {

    state = {

        userData: [],
        loggedIn: false
    }

    componentWillMount() {


        const user = sessionStorage.getItem("user");

        if (!user) {

            this.props.history.push("/login")
        }


        firebase.database().ref("users").orderByChild("email").equalTo(user).limitToFirst(1).once("value").then(snapshot => {

            const data = firebaseLooper(snapshot);

            this.setState({
                userData: data[0],
                loggedIn: true
            });
        })




    }

    handleLogout = () => {

        firebase.auth().signOut().then(() => {

            sessionStorage.clear();
            this.props.history.push("/login");
        })
    }

    renderProfile = () => {


        return this.state.userData ? <UserProfile userData={this.state.userData} type="feature" /> : null;


    }


    renderUserPost = () => {


        const userId = this.state.userData.id;
        const userData = this.state.userData;
        return userData && userId !== undefined ? <UserPost type="feature" userId={`${userId}`} /> : null;
    }

    render() {


        // const userId = this.state.userData.id;

        return <div>
            <Header />
            {this.renderProfile()}
            {this.renderUserPost()}
        </div>
    }
}

export default Profile;