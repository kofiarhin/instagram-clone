import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../firebase";
import UserData from "../widgets/userData/userData";
import Search from "../Search/search";

import "./userList.sass";


class UserList extends Component {

    state = {

        users: [],
        start: this.props.start,
        amount: this.props.amount,
        end: this.props.start + this.props.amount

    }


    componentWillMount() {

        //get list of users in firebase

        firebase.database().ref("users").once("value").then(snapshot => {

            const data = firebaseLooper(snapshot);

            const users = data.slice(this.state.start, this.state.end);

            this.setState({

                users
            })

        })


        //get user details

        firebase.database().ref(`users/${sessionStorage.getItem('userId')}`).once("value").then(snapshot => {

            this.setState({
                user: snapshot.val()
            })

        })

    }

    handleUnfollow = (event) => {

        const personId = event.target.value;

        //unfollow user
        const user = this.state.user;
        const following = user.following;

        if (following.includes(personId)) {


            const position = following.indexOf(personId);

            following.pop(position);

        }

        user.following = following;


        //updatefiebase with new array following

        firebase.database().ref(`users/${sessionStorage.getItem('userId')}`).update({
            following
        }).then(() => {

            console.log("udate done");

            this.setState({
                user
            })
        })

        // console.log(followingArray);
    }

    renderFollowButton = (personId) => {


        const user = this.state.user;
        const followingArray = user.following;

        if (followingArray) {

            return followingArray.includes(personId) ?

                <button className="cta btn btn-danger" value={personId} onClick={(event) => this.handleUnfollow(event)} > Unfollow</button> :
                <button className="cta btn btn-follow" value={personId} onClick={(event) => this.handleFollow(event)}> Follow </button>


        } else {

            return <button className="cta btn btn-follow" value={personId} onClick={(event) => this.handleFollow(event)}> Follow </button>

        }

    }



    handleFollow = (event) => {

        const personId = event.target.value;
        const user = this.state.user;
        const following = user.following;

        let dataToSubmit = [];

        if (following) {

            dataToSubmit = [...following, personId]
        } else {

            dataToSubmit.push(personId)

        }

        //update firebase with datatosubmit

        user.following = dataToSubmit

        firebase.database().ref(`users/${sessionStorage.getItem('userId')}`).update({

            following: dataToSubmit
        }).then(() => {

            console.log("following user");

            this.setState({

                user
            })

        })


    }



    renderUsers = () => {

        return this.state.users ? this.state.users.map((current, index) => {
            return <div className="main-unit-wrapper">
                <UserData userData={current} type="feature" />
                {this.renderFollowButton(current.id)}
            </div>
        }) : null;
    }

    handleChange = (element) => {

        const username = element.target.value;

        firebase.database().ref(`users`).orderByChild("username").equalTo(username).once("value").then(snapshot => {

            const users = firebaseLooper(snapshot);

            this.setState({
                users
            })

        })
    }

    render() {

        return <div>

            <Search change={(element) => this.handleChange(element)} />
            {this.renderUsers()}

        </div>
    }

}

export default UserList;