import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { NavBar, PostList, PostForm } from '../../components';
import Auth from '../../utils/auth';
//importing our queries
import { ALL_POSTS } from '../../utils/queries';
//import our mutations
// import { ADD_BADGE } from '../utils/mutations';

const HomePage = () => {
    const { loading, data } = useQuery(ALL_POSTS);
    const posts = data?.posts || [];
    console.log(data);

    const loggedIn = Auth.loggedIn();
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
            <NavBar />
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 mb-3 p-3">
                    <PostForm />
                </div>
                <div className="col-12 col-md-10 mb-3 p-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className='posts-container'>
                         <PostList posts={posts}
                        title='Recent Posts'
                        showTitle={true}
                        showpostText={true}
                        showUsername={true}
                        showButtons={true}
                      />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default HomePage;