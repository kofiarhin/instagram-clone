import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/hoc/Layout/layout";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Profile from "./components/Profile/profile";
const Routes = ({ user, ...rest }) => {




    return (



        <Layout user={user}>
            <Switch>
                {/* <Route path="/" exact component={Home} user={props.user} /> */}

                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/profile" exact component={Profile} />
            </Switch>
        </Layout >

    )

}

export default Routes; 