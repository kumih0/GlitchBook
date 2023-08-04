import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LIKE_POST, DISLIKE_POST } from '../utils/mutations';
import like_button from '../assets/img/like_button.png';
import dislike_button from '../assets/img/dislike_button.png';

const PostList = ({
  posts,
  postTitle,
  showpostTitle = true,
  showButtons = true,
}) => {
  const [likePost] = useMutation(LIKE_POST);
  const [dislikePost] = useMutation(DISLIKE_POST);

const handleLike = async (postId) => {
    try {
      await likePost({
        variables: { postId },
      });
    } catch (err) {
      console.log(err);
    }
  };

const handleDislike = async (postId) => {
    try {
      await dislikePost({
        variables: { postId },
      });
    } catch (err) {
      console.log(err);
    }
  };


  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      {showpostTitle && <h3>{postTitle}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="post mb-3">
            <h3 className="card-header bg-dark text-light p-2 m-0">
              {post.postTitle}
            </h3>
            <h4 className="p-2 m-0" >
                <Link
                  className="text-light"
                  to={`/profile/${post.username}`}
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{ fontSize: '1rem', textDecoration: 'none' }}>
                  {post.username} posted on {post.createdAt}
                  </span>
                </Link>
            </h4>
              <div className="card-body bg-light p-2">
                <p>{post.postText}</p>
              </div>
            <div className="post bottom-section d-flex justify-content-between bg-light p-2">
              {showButtons && (
                <button className="btn btn-sm btn-primary mb-2 p-1" name='like' onClick={() => handleLike(post._id)}>
                  <img src={like_button} alt={'Likes'}/> 
                   Likes: {post.likes}
                </button>
              )}
              {showButtons && (
                <button className="btn btn-sm btn-primary mb-2 p-1" name='dislike' onClick={() => handleDislike(post._id)}>
                  <img src={dislike_button} alt={'Dislikes'}/>
                  Dislikes: {post.dislikes}
                </button>
              )}
              <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/posts/${post._id}`}
                >
                {showButtons && (
                  <button className="btn btn-sm btn-primary p-2" name='comments' >
                    Comments: {post.commentCount}
                  </button>
                )}
                Join the discussion on this post.
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;