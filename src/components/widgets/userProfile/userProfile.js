import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../../firebase";
import "./userProfile.sass";
import { avatar } from "../../../config";
import Upload from "./upload";


class UserProfile extends Component {


    state = {

        profileURL: "default.jpg"
    }


    renderProfile = () => {


        const image = this.state.profileURL;

        // console.log(image);

        // return <image src="https://www.digitalcitizen.life/sites/default/files/styles/img_u_large/public/featured/2016-08/photo_gallery.jpg" />
        // // return (


        return (

            <div>

                <div style={{
                    height: "200px",
                    width: "200px",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}> </div>
                <button> Change  </button>


            </div>
        )
    }

    renderUserData = () => {

        const profile = this.props.userData.profile;

        if (profile) {

            //use firebase to get the file path
            firebase.storage().ref("profileImages").child(profile).getDownloadURL().then(url => {

                this.setState({
                    profileURL: url
                })

            })
        }

        return <div className="profile-wrapper">
            <div className="avatar-wrapper">
                {this.renderProfile()}
                {/* {console.log(userData)} */}
                {/* <Upload profile={this.props.userData} /> */}
            </div>

            <div className="content">
                <h1 className="name"> <span> Name:</span> {this.props.userData.name}</h1>
                <h1 className="email"> <span> Email:</span> {this.props.userData.email}</h1>
                <p> <Link to={`/profile/edit/${this.props.userData.id}`}> Edit Profile</Link> </p>
            </div>


        </div>
    }


    render() {

        // console.log(this.state);
        return <div> {this.renderUserData()} </div>


    }
}

export default UserProfile;