import React from "react";
import "./search.sass";


const Search = (props) => {


    return <div className="container">

        <div className="search-wrapper">

            <input type="text" nam="search" placeholder="Search user by username" onChange={(event) => props.change(event)} />
        </div>


    </div>
}


export default Search;