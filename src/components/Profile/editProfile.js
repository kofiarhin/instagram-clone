import React, { Component } from "react";
import Header from "../Header/header";
import FormField from "../widgets/FormFields/formFields";
import { firebase } from "../../firebase";

class EditProfile extends Component {

    state = {
        isLoading: false,
        formData: {

            name: {

                element: "input",
                value: "",
                config: {
                    type: "text",
                    name: "name",
                    placeholder: "Enter Full Name"
                },

                validation: {

                    required: true,
                    min: 4,
                    max: 50
                },

                valid: true,
                touched: false
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
        })
    }


    renderButton = () => {

        return this.state.isLoading ? "....Loading" : <button type="submit" name="submit"> Change </button>
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const formData = this.state.formData;

        let data = {};

        for (let key in formData) {
            data[key] = formData[key].value;
        }


        //validate data
        let checks = [];

        for (let key in data) {

            data[key] === "" ? checks.push(false) : checks.push(true)
        }

        console.log(checks);
        if (!checks.includes(false)) {

            const id = this.props.match.params.id;

            firebase.database().ref(`users/${id}`).update(data).then(() => {

                this.props.history.push("/profile")
            })
        }

    }

    render() {


        return <div>

            <Header />

            <div className="container">

                <h1 className="main-title text-center">  Edit Profile </h1>
                <div className='form-wrapper'>

                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormField formData={this.state.formData.name} change={(element) => this.handleChange(element)} id="name" />


                        {this.renderButton()}
                    </form>


                </div>


            </div>

        </div>
    }
}

export default EditProfile;