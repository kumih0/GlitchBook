import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import dislike_button from '../assets/img/dislike_button.png';
import like_button from '../assets/img/like_button.png';
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
                <div className='post '>
                    <div className='card-header'>
                        <h2 className='post-title'>{post.postTitle}</h2>
                        <span className='post-subtitle'>
                            <h3 className='post-author'>Posted by {post.username}</h3>
                            <h3 className='post-date'>Created on {post.createdAt}</h3>
                        </span>
                    </div>
                    <div className='post-box'>
                        <p className='post-text'>{post.postText}</p>
                    </div>
                    <div className='bottom-section'>
                        <span className='post-likes'>
                            <button className='btn btn-primary' onClick={() => handleLike}>
                                <img src={like_button} alt={'Likes'} />
                                Likes: {post.likes}</button>
                            <button className='btn btn-primary' onClick={() => handleDislike}>
                                <img src={dislike_button} alt={'Dislikes'} />
                                Dislikes: {post.dislikes}</button>
                        </span>
                        {Auth.loggedIn() && Auth.getProfile().data.username !== post.username && (
                            <span className='post-buttons'>
                                <button className='btn btn-primary' onClick={() => handleUpdate}>Update</button>
                                <button className='btn btn-danger' onClick={() => handleDelete}>Delete</button>
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