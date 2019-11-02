import React from "react";
import "./userPostTemplate.sass";


const UserPostTemplate = (props) => {

    const renderPostTemplate = () => {

        let template = "";
        const posts = props.postData;

        if (posts) {
            template = posts.map((current, index) => {
                const fileUrl = current.file.fileUrl;
                return <div className="template-unit" style={{
                    backgroundImage: `url(${fileUrl})`
                }}></div>
            })


            return template;

        }

    }
    return <div className="template-wrapper"> {renderPostTemplate()} </div>
}

export default UserPostTemplate;