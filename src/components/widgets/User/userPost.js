import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import UserPostTemplate from "./userPostTemplate";

class UserPost extends Component {

    state = {

        posts: [],
        userId: this.props.userId
    }

    componentWillMount() {


        const userId = this.props.userId;
        // console.log(userId);

        //get post by user

        firebase.database().ref('posts').orderByChild("userId").equalTo(userId).once("value").then(snapshot => {

            const posts = firebaseLooper(snapshot);

            this.setState({
                posts
            })

        })
    }

    renderUserPost = () => {

        const posts = this.state.posts;
        return posts ? <div> <UserPostTemplate postData={this.state.posts} /> </div> : null;
    }

    render() {


        return <div>{this.renderUserPost()}</div>
    }
}

export default UserPost;