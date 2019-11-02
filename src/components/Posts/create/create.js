import React, { Component } from "react";
import Header from "../../Header/header";
import FormField from "../../widgets/FormFields/formFields";
import "./create.sass";
import Uploader from "../../widgets/Uploader/uploader";
import { firebase, firebaseLooper } from "../../../firebase";
import { generateDate } from "../../../config";
class Create extends Component {

    state = {


        passed: false,
        userId: "",
        UserData: [],
        formData: {

            caption: {

                element: "textarea",
                value: "",
                validation: {

                    required: true,
                    min: 40,
                    max: 40
                },

                valid: true,
                touched: false
            },

            file: {
                filename: "",
                fileUrl: ""
            }
        }
    }


    componentWillMount() {


        const user = sessionStorage.getItem("user");

        // fetch user id from database

        firebase.database().ref("users").orderByChild("email").equalTo(user).once("value").then(snapshot => {

            const data = firebaseLooper(snapshot);
            const userData = data[0];
            const userId = userData.id;

            this.setState({
                userId,
                userData
            })


        })
    }


    handleChange = (element) => {


        const formData = this.state.formData;

        const field = formData[element.id];

        field.value = element.event.target.value;

        formData[element.id] = field;

        this.setState({

            formData
        });

    }



    renderButton = () => {

        return this.state.passed ? <button type="submit" name="submit"> Create </button > : null;
    }


    handleSubmit = (event) => {

        event.preventDefault();

        const formData = this.state.formData;

        let data = {}

        for (let key in formData) {

            data[key] = formData[key].value
        }

        data["userId"] = this.state.userId;
        data["file"] = formData.file;
        data['date'] = generateDate();
        data["user"] = this.state.userData;


        // console.log(data);
        firebase.database().ref("posts").push(data).then(() => {
            this.props.history.push('/profile?success');

        });
        // console.log(data);
        //do some validation before send file
        // //submit data to firebase

        // firebase.database().ref('posts').push(data).then(() => {

        //     this.props.history.push("/profile");
        // })
    }


    handleFileChange = (element) => {

        const formData = this.state.formData;
        const file = formData["file"];
        file.filename = element.filename;
        file.fileUrl = element.fileUrl;
        formData["file"] = file;

        this.setState({
            formData,
            passed: true
        })


    }

    render() {


        return <div>

            <Header />
            <div className="container">
                <h1 className="main-title text-center">  Create Post</h1>
                <div className="caption-wrapper">

                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        <Uploader change={(element) => this.handleFileChange(element)} />
                        <FormField formData={this.state.formData.caption} id="caption" change={(element) => this.handleChange(element)} />

                        {this.renderButton()}

                    </form>

                </div>
            </div>

        </div>
    }

}


export default Create;