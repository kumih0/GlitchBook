import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';


import { GET_ONE_POST } from '../utils/queries';
import { LIKE_POST, DISLIKE_POST, ADD_BADGE, UPDATE_POST, DELETE_POST } from '../utils/mutations';

import Auth from '../utils/auth';

const PostPage = () => {
    const { postId } = useParams();
    console.log(postId);

    const { loading, data } = useQuery(GET_ONE_POST, {
        variables: { postId: postId }
    });

    const post = data?.post || {};
    console.log(data);


    const [likePost] = useMutation(LIKE_POST);
    const [dislikePost] = useMutation(DISLIKE_POST);
    // const [addBadge] = useMutation(ADD_BADGE);
    const [updatePost] = useMutation(UPDATE_POST);
    const [deletePost] = useMutation(DELETE_POST);

    //add all of these and convert to actions/resolvers? 
    const handleLike = async () => {
        try {
            await likePost({
                variables: { postId: postId }
            });
        } catch (err) {
            console.log(err);
        }
    }

    const handleDislike = async () => {
        try {
            await dislikePost({
                variables: { postId: postId }
            });
        } catch (err) {
            console.log(err);
        }
    }

    // const handleBadge = async () => {
    //     try {
    //         await addBadge({
    //             variables: { badgeId: badgeId }
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const handleUpdate = async () => {
        try {
            await updatePost({
                variables: { postId: postId }
            });
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async () => {
        try {
            await deletePost({
                variables: { postId: postId }
            });
        } catch (err) {
            console.log(err);
        }
    }
    ///
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
        <NavBar />
        <div className='container'>
            <div className='card'>
                <div className='card-header'>
                    <h2 className='post-title'>{post.postTitle}</h2>
                    <span className='post-subtitle'>
                        <p className='post-author'>Posted by {post.username}</p>
                        <p className='post-date'>Created on {post.createdAt}</p>
                    </span>
                </div>
                <div className='card-body'>
                    <h4 className='post-text'>{post.postText}</h4>
                </div>
                <div className='card-footer'>
                    <span className='post-likes'>
                        <button className='btn btn-primary' onClick={() => handleLike}>Likes: {post.likes}</button>
                        <button className='btn btn-primary' onClick={() => handleDislike}>Dislikes: {post.dislikes}</button>
                    </span>
                    <p className='post-comment-count'>Comments: {post.commentCount}</p>
                    {Auth.loggedIn() && Auth.getProfile().data.username !== post.username && (
                        <span className='post-buttons'>
                            <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                        </span>
                    )}
                </div>
            </div>

            <div className='post-comments'>
                <CommentList comments={post.comments} />
                {Auth.loggedIn() && <CommentForm postId={post._id} />}
            </div>
        </div>
        </>
    );
};

export default PostPage;