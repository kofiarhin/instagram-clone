import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../firebase";
import PostTemplate from "../widgets/postTemplate/postTemplate";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';


class PostList extends Component {


    state = {

        userData: [],
        posts: [],
        refreshCount: 0
    }


    componentWillMount() {

        this.loadPage();

    };


    handleLike = (event) => {

        //use firebase to update the like on the post

        const postId = event.target.value;
        const userId = sessionStorage.getItem("userId");
        const posts = this.state.posts;
        const post = posts.filter((current, index) => {
            return current.id === postId;

            // return current;
        })[0];


        const likes = post.likes;


        if (!likes || likes == undefined) {

            let likes = [];
            likes.push(userId);

            // console.log(likes);
            posts.forEach((current, index) => {

                if (current.id === postId) {
                    current.likes = likes;
                    const newPosts = posts;

                    //update firebase 

                    firebase.database().ref(`posts/${postId}`).update({
                        likes
                    }).then(() => {

                        // console.log("liked post");

                        this.setState({
                            posts: newPosts
                        })

                    })
                }

            })
        } else {



            if (!likes.includes(userId)) {

                likes.push(userId);
            }

            //update interface and firebase
            posts.forEach((current, index) => {

                if (current.id === postId) {

                    current.likes = likes

                    firebase.database().ref(`posts/${postId}`).update({
                        likes
                    }).then(() => {
                        this.setState({
                            posts
                        })


                    })

                }

            })

        }
    }


    loadPage = () => {


        const user = sessionStorage.getItem("userId");

        //get list of following

        firebase.database().ref(`users/${user}`).once("value").then(snapshot => {


            const following = snapshot.val().following;

            if (following) {

                following.forEach((current, index) => {


                    //get list of post by

                    firebase.database().ref("posts").orderByChild("userId").equalTo(current).once("value").then(snapshot => {



                        const result = firebaseLooper(snapshot);

                        const posts = [...this.state.posts, ...result];

                        const fileteredData = posts.sort((a, b) => {

                            if (a.date > b.date) {

                                return 1
                            } else {

                                return -1;
                            }
                        })

                        this.setState({

                            posts: fileteredData
                        });


                    });


                });
            }



        });


    }

    handleUnlike = (event) => {

        // remove id from likes

        const postId = event.target.value;
        const userId = sessionStorage.getItem("userId");
        const posts = this.state.posts;

        const postArray = posts.filter((current) => {

            return current.id === postId;
        })


        const post = postArray[0];
        const likes = post.likes;

        const position = likes.indexOf(userId);

        likes.splice(position, 1);

        postArray.forEach((current, index) => {

            if (current.id === postId) {

                current.likes = likes;

                firebase.database().ref(`posts/${postId}`).update({
                    likes
                }).then(() => {

                    this.setState({
                        postArray
                    })

                })
            }

        })


    }

    renderPost = () => {

        const posts = this.state.posts;
        return posts && posts.length > 0 ?

            posts.map((current, index) => {

                return <PostTemplate postData={current} type="main"

                    handleUnlike={(event) => this.handleUnlike(event)}
                    handleLike={(event) => this.handleLike(event)}

                />
            })

            : <div> You need to <Link to="/users"> follow </Link>  someone to view pictures  </div>
    }


    render() {
        return <div> {this.renderPost()} </div>
    }
}

export default withRouter(PostList);