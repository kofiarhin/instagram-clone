import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/hoc/Layout/layout";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Profile from "./components/Profile/profile";
import Register from "./components/Register/register";
const Routes = () => {

    return (

        <Layout>
            <Switch>

                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/profile" exact component={Profile} />
            </Switch>
        </Layout >

    )

}

export default Routes; 