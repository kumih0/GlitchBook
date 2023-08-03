import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PostList from '../components/Posts/PostList';
import PostForm from '../components/Posts/PostForm';
import Auth from '../utils/auth';
//importing our queries
import { ALL_POSTS } from '../utils/queries';
//import our mutations
// import { ADD_BADGE } from '../utils/mutations';

const HomePage = () => {
    const { loading, data } = useQuery(ALL_POSTS);
    const posts = data?.allPosts || [];

    // const [addBadge, { error }] = useMutation(ADD_BADGE);

    // const handleAddBadge = async (badgeId) => {
    //     try {
    //         await addBadge({
    //             variables: { badgeId }
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 mb-3 p-3">
                    {Auth.loggedIn() ? (
                    <PostForm /> 
                    ) : (
                        <Link to='/'><p>Join the conversation and log in!</p></Link>
                )}
                </div>
                <div className="col-12 col-md-10 mb-3 p-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        data && <PostList posts={posts} title="Join the conversation!" />
                    )}
                </div>
            </div>
        </main>
    );
}

export default HomePage;