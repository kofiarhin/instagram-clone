import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import { firebase } from "../../../firebase";

class Uploader extends Component {


    state = {
        filename: "",
        isUploading: false,
        progress: 0,
        fileUrl: ""
    }


    handleUploadStart = () => {

        this.setState({
            isUploading: true
        })
    }


    handleUploadError = (error) => {

        this.setState({
            isUploading: false,
            progress: 0
        });

        console.log(error)
    }


    handleProgress = (progress) => {

        this.setState({

            progress
        })

    }


    handleUploadSuccess = (filename) => {


        // console.log(filename);

        firebase.storage().ref("profileImages").child(filename).getDownloadURL().then(url => {

            this.props.change({ filename, fileUrl: url })
            this.setState({

                filename,
                fileUrl: url,
                isUploading: false

            });
        })
    }







    renderAvatar = () => {

        return this.state.fileUrl ?


            <div className="preview" style={{
                backgroundImage: `url(${this.state.fileUrl})`,
                width: `450px`,
                height: "450px",
                maxWidth: "100%",
                marginBottom: "1rem",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}></div>

            : null;
    }


    renderProgress = () => {

        return this.state.isUploading ?

            <div className="progress" style={{
                width: `${this.state.progress}%`,
                height: "30px",
                background: 'green',
                marginBottom: "1rem"
            }}> </div> : null;

    }
    render() {


        return <div>

            {this.renderAvatar()}
            {this.renderProgress()}

            <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref("profileImages")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress} style={{
                    marginBottom: "1rem"
                }}
            />



        </div >
    }
}


export default Uploader;