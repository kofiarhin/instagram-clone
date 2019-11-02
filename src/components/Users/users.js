import React, { Component } from "react";
import Header from "../Header/header";
import UserList from "./userList";



class Users extends Component {


    render() {

        return <div>
            <Header />
            <UserList type="thumb" amount={10} start={0} />
        </div>
    }


}

export default Users;