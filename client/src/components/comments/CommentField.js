import { useState } from "react";

    // Render the CommentField component
    return (
        <div className={"search-box Comment-box"}>
            {/* Textarea to enter the Comment text */}
            <textarea
                maxLength={100} // TODO: Make max length a constant
                value={CommentText}
                onChange={(ev) => setCommentText(ev.target.value)}
            ></textarea>
            {/* Button to send the Comment */}
            <button onClick={e => sendComment()}>Comment</button>
        </div>
    );


export default CommentField;
