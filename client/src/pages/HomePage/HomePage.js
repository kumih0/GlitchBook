import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

//importing our queries
import { ALL_POSTS } from '../utils/queries';
//import our mutations
import { ADD_BADGE } from '../utils/mutations';