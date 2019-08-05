import React from "react";


const UserData = (props) => {


    const renderUser = () => {


        const user = props.userData;

        return <div className="user-container">

            <div> image here </div>
            <div>  content Here</div>



        </div>
    }


    return <div> {renderUser()} </div>
}

export default UserData;