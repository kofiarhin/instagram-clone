import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase, firebaseLooper } from "../../../firebase";
import "./post.sass";


class Post extends Component {


    state = {

        post: []
    }

    componentWillMount() {

        const id = this.props.match.params.id;

        //get post from database

        firebase.database().ref(`posts/${id}`).once("value").then(snapshot => {

            this.setState({

                post: snapshot.val()
            })


        })
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
        return post ?

            <div className="image-wrapper">

                <div style={{

                    backgroundImage: `url(${post.file})`,
                    backgroundSize: "cover"
                }} className="image"></div>

                <h2 className="caption"> {post.caption} </h2>

                {this.renderCta(post.userId)}
            </div>
            : null;
    }

    render() {

        return <div>

            <Header />
            <div className="container">  {this.renderPost()}  </div>

        </div>
    }
}


export default Post;