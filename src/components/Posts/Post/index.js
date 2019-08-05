import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase, firebaseLooper } from "../../../firebase";
import "./post.sass";
import _ from "lodash";
import PostTemplate from "./postTemplate";

class Post extends Component {

    state = {

        post: [],
        userData: []
    }

    componentWillMount() {

        const id = this.props.match.params.id;

        //get post from database

        firebase.database().ref(`posts/${id}`).once("value").then(snapshot => {

            const post = snapshot.val();
            const userId = post.userId;

            //fetch user
            firebase.database().ref(`users/${userId}`).once("value").then(snapshot => {


                this.setState({
                    post,
                    userData: snapshot.val()

                })

            })




        })

        //get user details

    }


    renderCta = (id) => {

        const user = sessionStorage.getItem("user");

        if (user === id) {

            return <div className="button-wrapper">


                <button onClick={() => this.handleDelete()}>Delete</button>
                <button onClick={() => this.handleEdit()}> Edit Post</button>

            </div>
        }


    }


    handleDelete = () => {


        console.log("delete file")

        const id = this.props.match.params.id;

        firebase.database().ref(`posts/${id}`).remove().then(() => {
            //delete file from file storage
            this.props.history.push("/profile");
        })
    }

    renderPost = () => {

        const post = this.state.post;
        const userData = this.state.userData;

        return _.isEmpty(post) && _.isEmpty(userData) ? null :


            < div className="main-post-wrapper" >
                {/* {console.log(userData.profile)} */}
                <div className="postImage" style={{
                    backgroundImage: `url(${post.file.fileUrl})`,
                    width: "100%"
                }}></div>
                <div className="content">

                    <div className="face" style={{
                        backgroundImage: `url(${userData.profile})`
                    }}>  </div>
                    <div className="caption"> <p>{post.caption} </p></div>


                </div>

            </div >;


    }

    render() {


        return <div>

            <Header />
            <div className="container">  {this.renderPost()}  </div>

        </div>
    }
}


export default Post;