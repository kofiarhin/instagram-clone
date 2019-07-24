import React, { Component } from "react";
import FormField from "../widgets/FormFields/formFields";
import { Link } from "react-router-dom";
import { firebase } from "../../firebase";

class Login extends Component {


    state = {

        formData: {

            email: {

                element: "input",
                value: "",
                config: {

                    type: "text",
                    name: "email-input",
                    placeholder: "Enter your email"
                }
            },

            password: {

                element: "input",
                value: "",
                config: {
                    type: "text",
                    name: "password-input",
                    placeholder: "Enter your passoword"
                }
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

        return <button> Login </button>
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const formData = this.state.formData;
        let data = {};
        for (let key in formData) {

            data[key] = formData[key].value
        }

        let checks = [];
        for (let key in formData) {

            if (formData[key].value == "") {

                checks.push(false)
            }
        }

        if (checks.length < 1) {

            //signin user
            firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(() => {
                console.log("you are logged in");
            })
        }
    }

    render() {

        return <div className="form-wrapper">

            <form onSubmit={(event) => this.handleSubmit(event)}>
                <h1 className="form-title"> Login</h1>

                <FormField formData={this.state.formData.email} id="email" change={element => this.handleChange(element)} />

                <FormField formData={this.state.formData.password} id="password" change={element => this.handleChange(element)} />

                {this.renderButton()}
                <p>Dont have an  account <Link to="/">Login Here</Link></p>
            </form>

        </div>
    }
}

export default Login;