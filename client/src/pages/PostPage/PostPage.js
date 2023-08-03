import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import CommentList from '../../components/Commennts/CommentList';
import CommentForm from '../../components/Commennts/CommentForm';

import { GET_ME, GET_USER } from '../../utils/queries';
import { LIKE_POST, DISLIKE_POST, ADD_BADGE, UPDATE_POST, DELETE_POST  } from '../../utils/mutations';

import Auth from '../../utils/auth';

