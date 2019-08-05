import React from "react";
import { Link } from "react-router-dom";
import "./header.sass"

const Header = () => {

    const renderLinks = () => {

        return sessionStorage.getItem('user') ?

            <div className="links">
                <Link to="/profile"> Profile </Link>
                <Link to="/create"> Create </Link>
                <Link to="/users"> Users </Link>
                <Link to="/logout"> Logout </Link>
            </div>

            : <div className="links">

                <Link to="/login"> Login </Link>
                <Link to="/register"> Register </Link>
            </div>;


    }
    const renderHeader = () => {


        return (

            <header className="main-header">
                <div className="container">

                    <h1><Link to="/"> Escogram </Link></h1>
                    <nav>
                        {renderLinks()}
                    </nav>
                </div>
            </header >

        )
    }

    return <div> {renderHeader()}</div>
}

export default Header;