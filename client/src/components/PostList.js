import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LIKE_POST, DISLIKE_POST } from '../utils/mutations';

const postList = ({
  posts,
  postTitle,
  postText,
  showpostTitle = true,
  showUsername = true,
  showButtons = true,
  showpostText = true,
}) => {


  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      {showpostTitle && <h3>{postTitle}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profile/${post.username}`}
                >
                  {post.username} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this post on {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this post on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            {showpostText && (
            <div className="card-body bg-light p-2">
              <p>{postText}</p>
            </div>
            )}
            <div className="card-footer d-flex justify-content-between bg-light p-2">
            {showButtons && (
              <button className="btn btn-sm btn-primary" >
                Like : {post.likes}
              </button>
            )}
            {showButtons && (
              <button className="btn btn-sm btn-primary" >
                Dislikes: {post.dislikes}
              </button>
            )}
            {showButtons && (
              <button className="btn btn-sm btn-primary" >
                Comments: {post.commentCount}
              </button>
            )}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              Join the discussion on this post.
            </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default postList;