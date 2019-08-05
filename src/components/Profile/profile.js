import React, { Component } from "react";
import UserProfile from "../widgets/userProfile/userProfile";
import { firebase } from "../../firebase";
import Header from "../Header/header";
import UserPost from "../widgets/userPosts/userPosts";


class Profile extends Component {

    state = {

        userData: [],
        loggedIn: false
    }

    componentWillMount() {

        const user = sessionStorage.getItem('user');
        // console.log(user);
        if (!user) {

            this.props.history.push("/login")
        } else {

            this.setState({
                loggedIn: true
            })
        }

        if (user) {


            // console.log("passs")
            // get details of user''=   



            firebase.database().ref(`users`).orderByChild("email").equalTo(user).once("value").then(snapshot => {

                // console.log(snapshot);
                snapshot.forEach((childSnapshot) => {

                    // console.log(childSnapshot);
                    const data = {
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    }

                    // console.log(data);

                    this.setState({
                        userData: data
                    })

                })
            })
            // firebase.database().ref(`users`).orderByChild("email").equalTo(user).limitToFirst(1).once("value").then(snapshot => {

            //     console.log(snapshot.val());
            // })
        }

    }

    handleLogout = () => {

        firebase.auth().signOut().then(() => {

            sessionStorage.clear();
            this.props.history.push("/login");
        })
    }

    renderUserData = () => {

        // console.log(this.state);
        return this.state.userData ? <UserProfile userData={this.state.userData} /> : "error ";
        // return this.state.userData.length > 0 ? <UserProfile userData={this.state.userData} /> : null;
    }


    render() {

        return <div>
            <Header />
            {this.renderUserData()}
            <UserPost type="feature" user={sessionStorage.getItem("user")} />
        </div>
    }
}

export default Profile;