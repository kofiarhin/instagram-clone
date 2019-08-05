import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../firebase";
import { Link } from "react-router-dom";
import Layout from "../hoc/Layout/layout";

class Posts extends Component {

    state = {

        posts: [],
        user: []
    }

    componentWillMount() {

        const user = sessionStorage.getItem("userId");
        let dataToRender = [];

        //get list of following

        firebase.database().ref(`users/${user}`).once("value").then(snapshot => {

            const following = snapshot.val().following;

            if (!following) {

                return null;
            }

            following.forEach((current, index) => {


                //get list of post by user

                firebase.database().ref('posts').orderByChild("userId").equalTo(current).once("value").then(snapshot => {

                    const data = firebaseLooper(snapshot);
                    data.forEach((current, index) => {
                        // dataToRender.push(current);

                        const personId = current.userId;
                        const post = current;
                        //get user details
                        let userPost = [];

                        firebase.database().ref(`users/${personId}`).once("value").then(snapshot => {

                            const personDetails = snapshot.val();
                            userPost = [post, personDetails];
                            dataToRender.push(userPost);

                            const filteredArray = dataToRender.sort((a, b) => {

                                return a.date > b.date
                            });



                            this.setState({

                                posts: filteredArray
                            })

                        })


                    })


                })

            });


        })




    }

    renderPost = () => {

        const posts = this.state.posts;
        return posts ?

            posts.map((current, index) => {

                const post = current[0];
                const user = current[1];

                const file = post.file.fileUrl;
                const profile = user.profile;
                const date = post.date;

                console.log(profile);


                return <div className="post-image-wrapper" style={{
                    width: "300px",
                    margin: "0 auto 2rem"
                }}>

                    <div className="post-image" style={{
                        height: "300px",
                        width: "100%",
                        backgroundImage: `url(${file})`,
                        backgroundSize: "cover",
                        marginBottom: "1rem",

                    }}> </div>
                    <div className="post-content">
                        <div className="face" style={{
                            width: "50px",
                            height: "50px",
                            backgroundImage: `url(${profile})`,
                            backgroundSize: "cover"
                        }}> </div>

                        <p className='username'>{user.username} </p>
                        <p className='date'>{date} </p>

                    </div>


                </div >


            })


            : null;

    }

    render() {

        return <div>


            {this.renderPost()}



        </div>
    }
}

export default Posts;