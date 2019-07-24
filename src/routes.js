import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/hoc/Layout/layout";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import PrivateRoute from "./components/Auth/privateRoute/privateRoute";


const Routes = (props) => {

    return (

        <Layout {...props}>

            <Switch>
                {/* <Route path="/" exact component={Home} user={props.user} /> */}
                <PrivateRoute user={props.user} path="/" component={Home} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Layout>

    )

}

export default Routes; 