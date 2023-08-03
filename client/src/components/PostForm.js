import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../utils/mutations';
import { ALL_POSTS, GET_ME } from '../utils/queries';

import Auth from '../utils/auth';

const PostForm = () => {
  const [postText, setpostText] = useState('');
  const [postTitle, setpostTitle] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: ALL_POSTS });

        cache.writeQuery({
          query: ALL_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: GET_ME });
      cache.writeQuery({
        query: GET_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          postTitle,
          postText,
          username: Auth.getProfile().data.username,
        },
      });

      setpostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postText' && value.length <= 280) {
      setpostText(value);
      setCharacterCount(value.length);

    }
    if (name === 'postTitle' && value.length <= 280) {
      setpostTitle(value);
      setCharacterCount(value.length);
    }
};

  return (
    <div>
      <h3>Make at post at your own peril</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
          <div className="col-12 col-lg-9 post-box">
              <textarea
                name="postTitle"
                placeholder="Put your post title here"
                value={postTitle}
                className="form-input w-100"
                style={{ lineHeight: '1', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9 post-box">
              <textarea
                name="postText"
                placeholder="Here's a new thought..."
                value={postText}
                className="form-input w-100"
                style={{ lineHeight: '3', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your posts. Please{' '}
          <Link to="/">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PostForm;