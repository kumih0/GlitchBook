import React from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_COMMENT, DISLIKE_COMMENT } from '../utils/mutations';
import { useParams } from 'react-router-dom';


const CommentList = ({ comments = [] }) => {
  
  const { postId } = useParams();
  const [likeComment] = useMutation(LIKE_COMMENT);
  const [dislikeComment] = useMutation(DISLIKE_COMMENT);

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }
  const handleLike = async (commentId) => {
    try {
      await likeComment({
        variables: { commentId: commentId }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async (commentId) => {
    try {
      await dislikeComment({
        variables: { commentId: commentId }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.username} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
                <button className='btn btn-primary' onClick={handleLike}>Likes: {comment.likes}</button>
                <button className='btn btn-primary' onClick={handleDislike}>Dislikes: {comment.dislikes}</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList