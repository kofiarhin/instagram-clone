import React from "react";
import "./search.sass";


const Search = (props) => {


    return <div className="container">

        <div className="search-wrapper">
            <form onSubmit={(event) => props.handleSubmit(event)}>
                <input type="text" nam="search" placeholder="Search user by username" onChange={(event) => props.change(event)} />
            </form>
        </div>


    </div>
}


export default Search;