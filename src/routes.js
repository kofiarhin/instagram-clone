import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/hoc/Layout/layout";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Profile from "./components/Profile/profile";
import Register from "./components/Register/register";
import Logout from "./components/Logout/logout";
import EditProfile from "./components/Profile/editProfile";
import Create from "./components/Posts/create/create";
import Post from "./components/Posts/Post/index";
import Users from "./components/Users/users";
import User from "./components/Users/User/index";
import Change from "./components/Profile/changeProfile";



const Routes = ({ user, ...rest }) => {


    return (



        <Layout user={user}>
            <Switch>
                {/* <Route path="/" exact component={Home} user={props.user} /> */}

                <Route path="/" exact component={Home} />
                <Route path="/posts/:id" exact component={Post} />
                <Route path="/users/:id" exact component={User} />
                <Route path="/users" exact component={Users} />
                <Route path="/profile/edit/:id" exact component={EditProfile} />
                <Route path="/create" exact component={Create} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/login" exact component={Login} />
                <Route path="/profile/change" exact component={Change} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/register" exact component={Register} />
            </Switch>
        </Layout >

    )

}

export default Routes; 