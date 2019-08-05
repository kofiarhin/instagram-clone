import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import PostsTemplate from "./postsTemplate";

class UserPosts extends Component {

    state = {

        posts: []
    }


    componentWillMount() {

        //fetch list of post by user

        firebase.database().ref("posts").orderByChild("userId").equalTo(this.props.user).once("value").then(snapshot => {

            let posts = firebaseLooper(snapshot)

            this.setState({
                posts
            })
        })


    }

    renderPosts = () => {

        return this.state.posts ? <div> <PostsTemplate posts={this.state.posts} type={this.props.type} />   </div> : null;
    }
    render() {


        return <div> {this.renderPosts()}</div>
    }
}

export default UserPosts;