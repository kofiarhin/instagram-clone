import React from "react";
import { Link } from "react-router-dom";
import "./userProfile.sass";
import { avatar } from "../../../config";
import Upload from "./upload";


const UserProfile = ({ userData }) => {


    const handleChange = () => {

        console.log(" change profile")
    }
    const renderUserData = () => {

        return userData ? <div className="profile-wrapper">

            <div className="avatar-wrapper">

                <Upload />

            </div>


            <div className="content">
                <h1 className="name"> {userData.name}</h1>
                <p> <Link to={`/profile/edit/${userData.id}`}> Edit Profile</Link> </p>
            </div>


        </div> : null;
    }

    return <div> {renderUserData()} </div>
}

export default UserProfile;