import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

//importing our queries
import { ALL_POSTS } from '../utils/queries';
//import our mutations
import { ADD_BADGE } from '../utils/mutations';

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
                    <PostForm />
                </div>
                <div className="col-12 col-md-10 mb-3 p-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PostList posts={posts} title="Join the conversation!" />
                    )}
                </div>
            </div>
        </main>
    );
}

export default HomePage;