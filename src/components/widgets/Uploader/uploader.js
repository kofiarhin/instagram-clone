import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import { firebase } from "../../../firebase";

class Uploader extends Component {


    state = {

        name: "",
        isUploading: false,
        progress: 0,
        fileUrl: '',


    }


    handleUploadStart = () => {

        this.setState({
            isUploading: true
        })

    }


    handleUploadError = (error) => {

        this.setState({
            isUploading: false
        })
        console.log(error);

    }


    handleProgress = (progress) => {


        this.setState({
            progress
        })
    }


    handleUploadSuccess = (filename) => {


        firebase.storage().ref("posts").child(filename).getDownloadURL().then(url => {


            //send value back

            this.props.filename(url)

            this.setState({
                fileUrl: url
            })
        })

    }

    renderAvatar = () => {


        return this.state.fileUrl ? <div style={{

            height: "200px",
            width: "200px",
            margin: " 0 auto 20px",
            backgroundImage: `url(${this.state.fileUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>  </div> : null;
    }


    render() {

        return <div>

            {this.renderAvatar()}
            <div style={{
                width: `${this.state.progress}%`,
                height: "30px",
                background: 'green',
                marginBottom: "1rem"


            }}> </div>
            <FileUploader

                accept="image/*"
                name="image"
                randomizeFilename
                storageRef={firebase.storage().ref('posts')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}

            />


        </div >
    }
}


export default Uploader;