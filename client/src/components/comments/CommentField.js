import { useState } from "react";
import './style/Comment.css'

    // Render the CommentField component
    const CommentField = () => {
    return (
        <div className={"search-box Comment-box"}>
            {/* Textarea to enter the Comment text */}
            <textarea
                maxLength={100} // TODO: Make max length a constant
            ></textarea>
            {/* Button to send the Comment */}
            <button>Comment</button>
        </div>
    )};
    


export default CommentField;
