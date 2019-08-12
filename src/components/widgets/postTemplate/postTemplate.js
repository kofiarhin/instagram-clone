import React from "react";
import { Link } from "react-router-dom";
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

                    <div className="cta-wrapper"> {renderCta()} {renderLikes(post)} </div>

                    <div className="post-content">
                        <div className="user-face" style={{
                            backgroundImage: `url(${userProfilePic})`
                        }}> </div>


                    </div>


                    {/* show comments */}
                    <div>

                        {renderComments()}
                        <p><Link to={`/posts/comments/${post.id}`}> Read More {renderCommentCount(post.comments)}</Link></p>
                    </div>


                    <div className="add-comment">
                        <form onSubmit={(event => props.handleSubmit(event))}>
                            <input name="comment" placeholder="Add Comment" onChange={(event) => props.handleChange({
                                postId: post.id,
                                event
                            })} />
                        </form>
                    </div>

                </div >
                break;
            default:
                template = null;
                break;
        }

        return template;
    }

    const renderCommentCount = (comments) => {

        if (comments) {

            return <span> ({comments.length}) </span>;
        }
    }

    const renderComments = () => {

        const { postData, commentSubmitted } = props;

        const comments = postData.comments;


        if (comments) {

            let template = "";
            template = comments.map((current, index) => {


                if (index < 3) {

                    const profileUrl = current.userData.profile;
                    return <div className="comment" style={{
                        display: "flex",
                        marginBottom: "0.4rem"
                    }}> <div className="face" style={{
                        width: "20px",
                        height: "20px",
                        backgroundImage: `url(${profileUrl})`,
                        backgroundSize: "cover",
                        marginRight: "0.5rem",
                        borderRadius: "50%"
                    }}> </div> {current.comment} </div>

                }
            })

            return template;
        }
    }

    const renderLikes = (post) => {
        const likes = post.likes;

        return likes ? <div className="likes"> {likes.length} </div> : null;
        // return likes.length > 0 ? <div className="likes"> {likes.length} </div> : null;
    }

    const renderCta = () => {

        const postData = props.postData;
        const likes = postData.likes;
        const postId = postData.id;
        const userId = sessionStorage.getItem("userId");
        // console.log(likes.length);

        //get likes
        if (likes && likes.includes(userId)) {

            return <div> <button value={postId}

                onClick={(event) => props.handleUnlike(event)}
                className="btn btn-unlike"> Unlike </button> </div>

        } else {

            return <div> <button value={postId}

                onClick={(event) => props.handleLike(event)}
                className="btn btn-like"> Like </button></div>

        }


    }

    return <div> {renderTemplate()}</div>
}
export default PostTemplate;