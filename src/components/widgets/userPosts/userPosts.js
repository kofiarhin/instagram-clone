import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import PostsTemplate from "./postsTemplate";

class UserPosts extends Component {

    state = {

        posts: []
    }


    componentWillMount() {

        const userId = this.props.userId;



        firebase.database().ref("posts").orderByChild("userId").equalTo(userId).once("value").then(snapshot => {
            const posts = firebaseLooper(snapshot);

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