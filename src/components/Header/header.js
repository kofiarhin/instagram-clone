import React from "react";
import { Link } from "react-router-dom";
import "./header.sass"

const Header = () => {

    const renderHeader = () => {

        return (

            <header className="main-header">
                <h1>Escogram</h1>
                <nav>
                    <Link to="/"> Home </Link>
                </nav>
            </header>

        )
    }

    return <div> {renderHeader()}</div>
}

export default Header;