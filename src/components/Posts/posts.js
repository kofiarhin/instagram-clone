import React from "react";
import { Link } from "react-router-dom";
import Layout from "../hoc/Layout/layout";

const Posts = () => {

    return <div>

        <div>  List of posts here</div>
        <div> Link to <Link to='/profile'>Profile </Link></div>

    </div>

}

export default Posts;