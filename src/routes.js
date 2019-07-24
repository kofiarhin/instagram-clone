import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/hoc/Layout/layout";
import Home from "./components/Home/home";
import Login from "./components/Login/login";


const Routes = (props) => {

    return (

        <Layout {...props}>

            <Switch>
                <Route path="/" exact component={Home} user={props.user} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Layout>

    )

}

export default Routes; 