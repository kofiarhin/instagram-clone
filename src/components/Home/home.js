import React, { Component } from "react";
import { Link } from "react-router-dom";
import Posts from "../Posts/posts";
import Header from "../Header/header";


// display home page
class Home extends Component {



    state = {

        loggedIn: false,
        posts: {}
    }

    componentWillMount() {

        if (sessionStorage.getItem("user")) {

            this.setState({
                loggedIn: true
            })
        }
    }

    renderHomepage = () => {

        return this.state.loggedIn ? <Posts /> : <p className="text-main text-center"> you need to <Link to="/login"> Login </Link> </p>;
    }

    render() {


        return <div>
            <Header />
            <div className="container"> {this.renderHomepage()} </div>

        </div >
    }
}

export default Home;