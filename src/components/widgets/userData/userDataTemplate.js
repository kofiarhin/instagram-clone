import React, { Component } from "react";
import { getUser } from "../../../firebase";
class UserDataTemplate extends Component {


    state = {

        userData: [],
        following: false
    }


    componentWillMount() {

        console.log(this.props)
    }

    // console.log(props)

    renderFollowLinks = () => {

        let template = null;
        const userData = getUser(sessionStorage.getItem('userId'));

    }

    renderUserData = () => {

        const userData = this.props.userData;
        const profile = userData.profile;
        return <div className="profile-wrapper">

            <div className="avatar" style={{
                backgroundImage: `url(${profile})`
            }}></div>
            <div className="content">
                <p className="name"> Name: {this.props.userData.name}</p>
                <p className="email"> Email:  {this.props.userData.email}</p>
                {this.renderFollowLinks()}
            </div>
        </div>
    }

    render() {

        return <div>{this.renderUserData()} </div>
    }
}

export default UserDataTemplate;