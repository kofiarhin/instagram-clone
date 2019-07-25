import React from "react";
import { Route } from "react-router-dom";
import Profile from "../../Profile/profile";
import Login from "../../Login/login";

const PrivateRoute = (props) => {

    const handleRoute = () => {

        return "Profile";

    }

    return <Route path="/profile" exact component={handleRoute()} />
}

export default PrivateRoute;