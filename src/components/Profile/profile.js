import React, { Component } from "react";
import { firebase } from "../../firebase";



class Profile extends Component {


    componentWillMount() {

        const user = sessionStorage.getItem('user');

        if (!user) {

            this.props.history.push("/login")
        }

    }

    handleLogout = () => {

        firebase.auth().signOut().then(() => {

            sessionStorage.clear();
            this.props.history.push("/login");
        })
    }
    render() {

        console.log(this.props);

        return <div>


            render Profile

                <button onClick={() => this.handleLogout()}> Logout </button>


        </div>
    }
}

export default Profile;