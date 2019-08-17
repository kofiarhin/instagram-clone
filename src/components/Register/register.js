import React, { Component } from "react";
import FormField from "../widgets/FormFields/formFields";
import { firebase } from "../../firebase";
import Header from "../Header/header";
class Register extends Component {


    state = {

        formData: {

            email: {
                element: "input",
                value: "",
                config: {
                    type: "text",
                    name: "username-input",
                    placeholder: "Enter your email"
                },
                validation: {

                    required: true

                },
                valid: true,
                validationMessage: ""

            },

            name: {
                element: "input",
                value: "",
                config: {
                    type: "text",
                    name: "name-input",
                    placeholder: "Enter your Full Name"
                },
                validation: {

                    required: true

                },
                valid: true,
                validationMessage: ""

            },

            username: {
                element: "input",
                value: "",
                config: {
                    type: "text",
                    name: "username-input",
                    placeholder: "Enter your username"
                },
                validation: {

                    required: true

                },
                valid: true,
                validationMessage: ""

            },



            password: {
                element: "input",
                value: "",
                config: {
                    type: "text",
                    name: "password-input",
                    placeholder: "Enter your password"
                },
                validation: {

                    required: true
                },

                valid: true,
                validationMessage: ""

            },





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

        return <button type="submit" name="submit"> Sign up</button>
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const formData = this.state.formData;
        let data = {}
        for (let key in formData) {
            data[key] = formData[key].value;

        }

        //check if form is valid
        let checks = [];
        for (let key in formData) {

            if (formData[key].value === "") {

                checks.push(false);
            }
        }

        data['profile'] = "default.jpg";
        // console.log(data);
        // if (checks.length < 1) {

        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(() => {

            //store data 
            firebase.database().ref("users").push(data).then(() => {

                this.props.history.push('/login');
            })


        })
        // }
    }
    render() {

        return (

            <div>

                <Header />

                <div className="form-wrapper">

                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        <h1 className="form-title">Escogram</h1>
                        <p className="slug">Signup to see pictures and videos <span>from your friends</span> </p>
                        <FormField formData={this.state.formData.email} id="email" change={(element) => this.handleChange(element)} />

                        <FormField formData={this.state.formData.name} id="name" change={(element) => this.handleChange(element)} />


                        <FormField formData={this.state.formData.username} id="username" change={(element) => this.handleChange(element)} />


                        <FormField formData={this.state.formData.password} id="password" change={(element) => this.handleChange(element)} />

                        {this.renderButton()}

                    </form>

                </div>

            </div>
        )
    }
}

export default Register;