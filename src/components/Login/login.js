import React, { Component } from "react";
import FormField from "../widgets/FormFields/formFields";
import { Link } from "react-router-dom";
import { firebase, firebaseLooper } from "../../firebase";
import Header from "../Header/header";
import "./login.sass"

class Login extends Component {


    state = {

        loginError: "",

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

            if (formData[key].value === "") {

                checks.push(false)
            }
        }

        if (checks.length < 1) {

            //signin user
            firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(() => {
                sessionStorage.setItem("user", data.email);

                //

                firebase.database().ref("users").orderByChild("email").equalTo(data.email).once("value").then(snapshot => {

                    const data = firebaseLooper(snapshot);

                    const user = data[0];

                    const userId = user.id;

                    sessionStorage.setItem("userId", userId);

                    this.props.history.push("/profile")

                })
                //this.props.history.push("/")
            }).catch(error => {

                const loginError = error.message;
                this.setState({
                    loginError
                })
            })
        } else {

            this.setState({

                loginError: "Please check forms details and try again"
            })
        }
    }


    renderLoginError = () => {

        return this.state.loginError ? <p className="error"> {this.state.loginError} </p> : null;


    }

    render() {

        return (
            <div>
                <Header />


                <div className="form-wrapper">

                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        <FormField formData={this.state.formData.email} id="email" change={element => this.handleChange(element)} />

                        <FormField formData={this.state.formData.password} id="password" change={element => this.handleChange(element)} />

                        {this.renderButton()}
                        <p>Dont have an  account <Link to="/">Signup here</Link></p>
                    </form>
                    {this.renderLoginError()}

                </div>

            </div>

        )
    }
}

export default Login;