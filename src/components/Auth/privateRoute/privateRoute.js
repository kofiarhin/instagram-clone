import React from "react";
import { Route } from "react-router-dom";
const PrivateRoute = (props) => {


    return <Route path={props.user ? "/" : "/login"} component={props.user ? "Home" : "Login"} />
}

export default PrivateRoute;