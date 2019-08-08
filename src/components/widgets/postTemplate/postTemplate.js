import React from "react";
import "./postTemplate.sass";

const PostTemplate = (props) => {


    const renderTemplate = () => {


        // console.log(props.postData);


        const type = props.type;
        const post = props.postData;
        const fileUrl = post.file.fileUrl;
        const userData = props.postData.user;
        const userId = sessionStorage.getItem("userId");

        const userProfilePic = userData.profile;
        let template = null;

        switch (type) {

            case "main":
                template = <div className="post-template-wrapper">
                    <div className="post-image" style={{
                        backgroundImage: `url(${fileUrl})`,
                    }}></div>

                    <div className="cta-wrapper"> {renderCta()}</div>

                    <div className="post-content">
                        <div className="user-face" style={{
                            backgroundImage: `url(${userProfilePic})`
                        }}> </div>

                        <p className="caption"> {post.caption} </p>
                    </div>

                </div>
                break;
            default:
                template = null;
                break;
        }

        return template;
    }

    const renderCta = () => {

        const postData = props.postData;

        const likes = postData.likes;
        const postId = postData.id;
        const userId = sessionStorage.getItem("userId");

        //get likes
        if (likes && likes.includes(userId)) {


            return <div> <button value={postId}

                onClick={(event) => props.handleUnlike(event)}
                className="btn btn-unlike"> Unlike </button>  </div>

        } else {

            return <div> <button value={postId}

                onClick={(event) => props.handleLike(event)}
                className="btn btn-like"> Like </button>  </div>

        }


    }
    return <div> {renderTemplate()}</div>
}
export default PostTemplate;