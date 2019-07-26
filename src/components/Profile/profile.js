import React, { Component } from "react";
import UserProfile from "../widgets/userProfile/userProfile";
import { firebase } from "../../firebase";
import Header from "../Header/header";


class Profile extends Component {

    state = {

        userData: [],
        loggedIn: false
    }

    componentWillMount() {

        const user = sessionStorage.getItem('user');

        if (!user) {

            this.props.history.push("/login")
        } else {

            this.setState({
                loggedIn: true
            })
        }

        if (user) {

            // get details of user

            firebase.database().ref(`users`).orderByChild("email").equalTo(user).once("value").then(snapshot => {

                snapshot.forEach((childSnapshot) => {

                    const data = {
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    }

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
    render() {

        return <div>
            <Header />
            <UserProfile userData={this.state.userData} />
        </div>
    }
}

export default Profile;