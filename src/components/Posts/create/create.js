import React, { Component } from "react";
import Header from "../../Header/header";
import FormField from "../../widgets/FormFields/formFields";
import "./create.sass";
import Uploader from "../../widgets/Uploader/uploader";
import { firebase } from "../../../firebase";
class Create extends Component {

    state = {

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
                value: ""
            }
        }
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

    handleFilename = (filename) => {

        const file = this.state.formData.file;
        const formData = this.state.formData;
        file.value = filename;


        formData['file'] = file;

        this.setState({
            formData
        })


    }


    renderButton = () => {

        return <button type="submit" name="submit"> Create </button >
    }


    handleSubmit = (event) => {

        event.preventDefault();

        const formData = this.state.formData;

        let data = {}

        for (let key in formData) {

            data[key] = formData[key].value
        }

        data["userId"] = sessionStorage.getItem("user");


        //submit data to firebase

        firebase.database().ref('posts').push(data).then(() => {

            this.props.history.push("/profile");
        })
    }

    render() {

        return <div>

            <Header />
            <div className="container">
                <h1 className="main-title text-center">  Create Post</h1>
                <div className="caption-wrapper">

                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        <Uploader filename={(filename) => this.handleFilename(filename)} />
                        <FormField formData={this.state.formData.caption} id="caption" change={(element) => this.handleChange(element)} />


                        {this.renderButton()}

                    </form>

                </div>
            </div>

        </div>
    }

}


export default Create;