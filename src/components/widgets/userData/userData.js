import React from "react";
import { avatar } from "../../../config";
import { firebase, firebaseLooper } from "../../../firebase";
import "./userData.sass"

const UserData = (props) => {

    const handleFollow = (event) => {

        const user = event.target.value;
        const userId = sessionStorage.getItem('userId');


        //update firebase
        // get list of following
        firebase.database().ref(`users/${userId}`).once("value").then(snapshot => {

            const followArray = snapshot.val().following;
            let dataToSubmit = []

            if (followArray) {


                //get list of following and add to it

                dataToSubmit = [...followArray, user];


            } else {


                dataToSubmit.push(user);


            }


            console.log(dataToSubmit);


            //update user following
            firebase.database().ref(`users/${userId}`).update({
                "following": dataToSubmit
            }).then(() => {

                console.log("folowing updated")
            })


        })

    }

    const renderFollow = (personId, userData) => {

        // console.log(personId);
    }

    const renderUserData = () => {

        // console.log(props);
        const type = props.type;
        let template = null;
        const userData = props.userData;
        const name = userData.name;
        const email = userData.email;
        const profilePic = userData.profile === "" || userData.profile === undefined || userData.profile === "default.jpg" ? avatar : userData.profile;

        const userId = userData.id;
        // console.log(profilePic);
        switch (type) {

            case "feature":
                template =

                    <div className="user-unit">

                        <div className="face" style={{
                            backgroundImage: `url(${profilePic})`,
                        }}> </div>

                        <div className="content">
                            <p className="name"> Name: {name} </p>
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