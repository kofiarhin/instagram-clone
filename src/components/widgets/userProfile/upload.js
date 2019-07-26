import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import { firebase } from "../../../firebase";
import { avatar } from "../../../config";

class Upload extends Component {


    state = {

        isUploading: false,
        filename: "",
        progress: 0,
        fileUrl: "",
        changed: false,
        showButton: false
    }

    renderAvatar = () => {
        return this.state.fileUrl ? this.state.fileUrl : avatar;
    }


    handleUploadStart = () => {

        this.setState({
            isUploading: true
        })
    }

    handleProgress = (progress) => {
        this.setState({
            progress
        })
    }

    handleUploadError = (error) => {

        this.setState({
            isUploading: false,
            progress: 0
        })
    }


    handleUploadSuccess = (filename) => {


        this.setState({
            isUploading: false,
            filename
        });

        //get the file complete url
        firebase.storage().ref("profileImages").child(filename).getDownloadURL().then(url => {


            this.setState({
                fileUrl: url,
                showButton: true
            })

        })

    }

    handleChange = () => {

        //update firebase with user profile image url
        //get user

        const user = sessionStorage.getItem("user");

        firebase.database().ref("users").orderByChild("email").equalTo(user).once("value")
            .then(snapshot => {
                let key = null;
                snapshot.forEach((childSnapshot) => {

                    key = childSnapshot.key;

                });


                if (key && this.state.filename !== "") {

                    //update firebase

                    firebase.database().ref(`users/${key}`).update({
                        profile: this.state.filename
                    }).then(() => {

                        this.setState({
                            changed: true
                        })
                    })
                }

            })

    }


    renderButton = () => {

        return this.state.showButton ? <button className="btn btn-block" onClick={() => this.handleChange()}> Change </button> : null;
    }

    renderProgress = () => {

        return this.state.progress > 0 ? <p className="progress"> {this.state.progress} </p> : null;
    }
    render() {


        return <div className="avatar-wrapper">

            <div>
                <label className="avatar" style={{
                    backgroundImage: `url(${this.renderAvatar()})`,
                }}>
                    <FileUploader

                        hidden
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref("profileImages")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />

                </label>

                {this.renderProgress()}
                {this.renderButton()}
            </div>



        </div>
    }
}

export default Upload;