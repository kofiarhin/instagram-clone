import React, { Component } from "react";
import { getUser } from "../../../firebase";
class UserDataTemplate extends Component {


    state = {

        userData: [],
        personData: this.props.userData,
        following: false
    }


    componentWillMount() {
        // this.checkFollowing();

    }

    // console.log(props)

    checkFollowing = () => {


        const userData = getUser(sessionStorage.getItem('userId'));

        userData.then(result => {

            const personData = this.props.userData;
            const following = personData.following;
            const userId = sessionStorage.getItem("iuserId");

            if (following.includes(userId)) {

                this.setState({

                    following: true
                })
            }
        })

    }

    renderLinks = () => {

        const following = this.state.following;
        return following ? <button> Unfollow </button> : <button>Follow</button>
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

                {this.renderLinks()}

            </div>
        </div>
    }

    render() {

        console.log(this.props);

        return <div>{this.renderUserData()} </div>
    }
}

export default UserDataTemplate;