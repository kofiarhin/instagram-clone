import React from "react";
import "./postsTemplate.sass";
import { Link } from "react-router-dom";

const PostsTemplate = (props) => {

    const renderTemplate = () => {


        const type = props.type;

        const posts = props.posts;
        let template = null;
        switch (type) {

            case "feature":

                if (posts.length > 0) {

                    template = posts.map((current, index) => {
                        console.log(current);
                        return <Link to={`/posts/${current.id}`} style={{
                            backgroundImage: `url(${current.file})`
                        }} className="post-unit"> </Link>
                    })
                }
                break;
            default:
                template = null;

        }
        return <div className="post-wrapper">  {template} </div>

    }
    return <div className="container">

        <div> {renderTemplate()} </div>

    </div>
}

export default PostsTemplate; 