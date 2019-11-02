import React, { Component } from "react";
import { firebase, firebaseLooper, getUser } from "../../../firebase";
import Header from "../../Header/header";
import UserProfile from "../../widgets/User/userProfile";
import "./user.sass"

class User extends Component {


    state = {

        userData: [],
        posts: [],
        following: false
    }

    componentWillMount() {

        // console.log(this.props.match.params.id)
        const userId = this.props.match.params.id;
        getUser(userId).then(result => {

            const userData = result
            //get list of post
            firebase.database().ref("posts").orderByChild("userId").equalTo(userId).once("value").then(snapshot => {

                const posts = firebaseLooper(snapshot);
                this.setState({
                    userData,
                    posts
                })

            })

        })


    }

    renderUserProfile = () => {

        const userData = this.state.userData;

        return userData ? <UserProfile userData={userData} type="main" /> : null;
    }

    showPost = () => {

        let template = null;
        const posts = this.state.posts;
        template = posts.map((current, index) => {
            const fileUrl = current.file.fileUrl;

            return <div className="thumb-unit" style={{
                backgroundImage: `url(${fileUrl})`,
            }}></div>
        })




        return template

    }
    renderPosts = () => {

        const posts = this.state.posts;


        return posts ? <div className="container">


            <div className="thumb-wrapper">{this.showPost()} </div>


        </div> : null;

    }


    render() {

        // console.log(this.state);

        return <div>
            <Header />
            {this.renderUserProfile()}
            {this.renderPosts()}

        </div>
    }
}

export default User;