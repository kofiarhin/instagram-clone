import React from "react";
import "./userProfile.sass";
import { avatar } from "../../../config";
import { Link } from "react-router-dom";

const UserProfile = (props) => {

    // console.log(props.userData);

    const renderCta = () => {
        const user = sessionStorage.getItem("user");
        if (user) {

            return <div className="button-wrapper">
                <Link to="/profile/change"> Change Profile  </Link>

            </div>
        }
    }

    const renderProfile = () => {

        const userData = props.userData;
        const type = props.type;

        const userImage = userData.profile === "default.jpg" ? avatar : userData.profile;

        // console.log(userData);

        const name = userData.name;
        const email = userData.email;
        // console.log(userImage);

        let template = null;
        switch (type) {
            case "feature":

                template = <div className="container">

                    <div className="profile-wrapper">

                        <div className="profile"
                            style={{
                                backgroundImage: `url(${userImage})`
                            }}
                        >

                        </div>
                        <div className="content">

                            <p className="name"> Name: {name} </p>
                            <p className="email"> Email: {email} </p>
                            {

                                renderCta()
                            }
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