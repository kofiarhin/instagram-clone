import React from "react";
import { Link } from "react-router-dom";
import { avatar } from "../../../config";
import "./userData.sass"

const UserData = (props) => {


    const renderUserData = () => {

        // console.log(props);
        const type = props.type;
        let template = null;
        const userData = props.userData;
        const name = userData.name;
        const email = userData.email;
        const profilePic = userData.profile === "" || userData.profile === undefined || userData.profile === "default.jpg" ? avatar : userData.profile;

        // const userId = userData.id;
        // console.log(profilePic);
        switch (type) {

            case "feature":
                template =

                    <div className="user-unit">

                        <div className="face" style={{
                            backgroundImage: `url(${profilePic})`,
                        }}> </div>

                        <div className="content">
                            <p className="name"> <Link to={`users/${userData.id}`}>Name: {name}</Link>  </p>
                            <p className="email"> Email: {email} </p>
                        </div>

                    </div>
                break;
            default:
                template = null;
                break;

        }
        return template;
    }

    return <div className="container">

        <div className="userData-wrapper"> {renderUserData()} </div>

    </div>
}

export default UserData;