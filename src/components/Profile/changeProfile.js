import React, { Component } from "react";
import Header from "../Header/header";
import { LoggedIn } from "../../config";
import Uploader from "../widgets/Uploader/uploader";
import { firebase, firebaseLooper } from "../../firebase";



class ChangeProfile extends Component {

    state = {

        filename: "",
        fileUrl: "",
        error: ''

    }


    componentWillMount() {

        if (!LoggedIn()) {

            this.props.history.push("/login")
        }

    }

    handleFileChange = (element) => {

        this.setState({
            filename: element.filename,
            fileUrl: element.fileUrl,
            error: ""
        })

    }


    handleSubmit = (event) => {

        event.preventDefault();

        // console.log('handle submit');

        // //do some validation works

        if (this.state.filename === "" || this.state.fileUrl === "") {

            this.setState({

                error: "Please select a file"
            })
        } else {

            const user = LoggedIn();
            const fileUrl = this.state.fileUrl;
            const filename = this.state.filename;

            firebase.database().ref("users").orderByChild("email").equalTo(user).once("value").then((snapshot) => {

                const data = firebaseLooper(snapshot);

                const userData = data[0];

                const userId = userData.id;

                firebase.database().ref(`users/${userId}`).update({
                    profile: fileUrl,
                    filename
                }).then(() => {

                    this.props.history.push('/profile')
                })
            })


        }
    }

    renderButton = () => {


        return <button type="submit" name="submit"> Change</button>
    }


    renderError = () => {

        return this.state.errror !== "" ? <p> {this.state.error} </p> : null;
    }

    render() {

        console.log(this.state);

        return <div>

            <Header />

            <form onSubmit={(event) => this.handleSubmit(event)} >
                <div className="form-wrapper">

                    <h1 className="form-title"> Change Profile </h1>

                    <Uploader type="feature" change={(element) => this.handleFileChange(element)} />
                    {this.renderButton()}
                    {this.renderError()}
                </div>

            </form>

        </div>
    }

}


export default ChangeProfile;