import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../firebase";
import UserData from "../widgets/userData/userData";
import Search from "../Search/search";

import "./userList.sass";


class UserList extends Component {

    state = {

        users: [],
        error: "",
        user: [],
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

    handleFollow = (event) => {


        const user = this.state.user;
        const userId = sessionStorage.getItem("userId");
        const following = user.following;

        if (!following) {

            let following = [];

            following.push(event.target.value);

            firebase.database().ref(`users/${userId}`).update({
                following
            }).then(() => {

                user.following = following;

                this.setState({
                    user
                })
            })

        } else {

            const personId = event.target.value;
            // let newFollowing = [];
            if (!following.includes(personId)) {

                following.push(personId);
            }


            user.following = following

            firebase.database().ref(`users/${userId}`).update({
                following
            }).then(() => {

                this.setState({

                    user
                })
            })


        }





    }

    handleUnfollow = (event) => {

        const user = this.state.user;
        const userId = sessionStorage.getItem("userId");
        const personId = event.target.value;
        const following = user.following;


        //returns an object -- convert object to an array 
        const followArray = Array.from(following);

        //check if person id is in array
        if (followArray.includes(personId)) {

            // get the position of person id in array
            const position = followArray.indexOf(personId);

            //remove item from  array
            followArray.splice(position, 1);

            //update firebase with the change
            firebase.database().ref(`users/${userId}`).update({
                following: followArray
            }).then(() => {

                //fetch user again
                firebase.database().ref(`users/${userId}`).once("value").then(snapshot => {

                    const user = snapshot.val();

                    return user;

                }).then(result => {

                    this.setState({
                        user: result
                    })
                })
            })

        }




    }

    renderFollowButton = (personId) => {

        const userId = sessionStorage.getItem("userId");

        const user = this.state.user;


        if (personId !== userId) {

            const followingArray = user.following;

            if (followingArray) {

                return followingArray.includes(personId) ?

                    <button className="cta btn btn-danger" value={personId} onClick={(event) => this.handleUnfollow(event)} > Unfollow</button> :
                    <button className="cta btn btn-follow" value={personId} onClick={(event) => this.handleFollow(event)}> Follow </button>


            } else {

                return <button className="cta btn btn-follow" value={personId} onClick={(event) => this.handleFollow(event)}> Follow </button>

            }

        }

    }







    renderUsers = () => {

        // console.log("render user");
        console.log(this.state.users);

        return this.state.users ? this.state.users.map((current, index) => {

            return <div className="main-unit-wrapper">
                <UserData userData={current} type="feature" />
                {this.renderFollowButton(current.id)}
            </div>
        }) : null;
    }

    handleChange = (element) => {

        const username = element.target.value;
        const users = this.state.users;

        if (username === "") {

            this.loadUsers();

        } else {

            const user = users.filter((current) => {

                return current.username === username;
            })

            if (user.length > 0) {

                this.setState({

                    users: user
                })
            } else {

                this.setState({

                    error: "User not Found"
                })
            }
        }





        // firebase.database().ref(`users`).orderByChild("username").equalTo(username).once("value").then(snapshot => {

        //     const users = firebaseLooper(snapshot);

        //     this.setState({
        //         users
        //     })

        // })
    }

    loadUsers = () => {

        firebase.database().ref("users").once("value").then(snapshot => {

            const users = firebaseLooper(snapshot);

            this.setState({
                users
            })
        })
    }

    render() {

        // console.log(this.state.users);

        return <div className="container">

            <Search change={(element) => this.handleChange(element)} />
            {this.renderUsers()}

        </div>
    }

}

export default UserList;