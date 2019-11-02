import React from "react";
import "./userProfile.sass";

const UserProfile = (props) => {


    const renderButtons = () => {

        const userData = props.userData;
        const sessionId = sessionStorage.getItem("userId");
        const following = userData.following;

        // console.log(sessionId, following);


        //dont show follow button when its same user
        if (following && following.includes(sessionId)) {

            return sessionId !== userData.id ? <button className="btn btn-unlike">Unfollow</button> : <button className="btn btn -main">  Return to Profile</button>
        } else {

            return <button className="btn btn-follow"> follow </button>
        }

    }
    const renderProfile = () => {

        const userData = props.userData;
        const name = userData.name;
        const username = userData.username;
        const profileImage = userData.profile;
        const type = props.type;
        let template = null;

        switch (type) {

            case "main":
                template = <div className="container">

                    {/* personal detail */}
                    <div className="user-profile-wrapper">

                        <div className="avatar" style={{
                            backgroundImage: `url(${profileImage})`
                        }}></div>
                        <div className="content">

                            <p className="name">Name: {name}</p>
                            <p className="username">Username: {username}</p>
                            {renderButtons()}

                        </div>

                    </div>

                </div>
                break;
            default:
                template = null;
                break;
        }


        return template;
    }

    return <div> {renderProfile()} </div>
}

export default UserProfile;