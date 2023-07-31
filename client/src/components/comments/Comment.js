import like_button from './img/like_button.png'
import dislike_button from './img/dislike_button.png'
import { Link } from "react-router-dom";

// The comment component represents a single comment and its associated actions (like, dislike, remove).
const comment = ({ comment, remove, dislike, like, userData }) => {
    return (
        <div className={"post"}>
            {/* Display the user's username and a link to view the full comment */}
            <div className={"header-info"}>
                <label> user: {comment.username}</label>
                {/* Link to the comment details page */}
                <Link style={{ textDecoration: 'none' }} to={`/comment/${comment.id}`} state={comment}>
                    <p>{comment.value}</p>
                </Link>
            </div>
            {/* Display the bottom section of the comment, including actions and like/dislike counts */}
            <div className={"bottom-section"}>
                {/* If the comment belongs to the current user, display a delete button */}
                {(userData.id === comment.uid) ? (
                    <button className={"del-button"} onClick={() => remove()}>Delete</button>
                ) : (
                    "" // If the comment does not belong to the user, display an empty string
                )}
                {/* Dislike button */}
                <button onClick={() => dislike()}>
                    <img src={dislike_button} alt={"Dislike"}></img>
                </button>
                {/* Like button */}
                <button className={"like-button"} onClick={() => like()}>
                    <img src={like_button} alt={"Like"}></img>
                </button>
                {/* Display the number of dislikes */}
                <p>Dislikes: {comment.dislikes}</p>
                {/* Display the number of likes */}
                <p>Likes: {comment.likes}</p>
            </div>
        </div>
    );
}

export default comment;
