import { AuthenticationError } from '@apollo/server';
import { User, Post } from '../models';
import { signToken } from '../utils/auth';

const resolvers = {
    Query: {
        //get me query
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('posts').populate('friends');
            }

            throw new AuthenticationError('Not logged in');
        },
        //get all users query
        users: async () => {
            return await User.find().populate('posts').populate('friends');
        },
        //get user by username query
        user: async (parent, { username }) => {
            return await User.findOne({ username }).populate('posts').populate('friends');
        },
        //get all posts query
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return await Post.find(params).sort({ createdAt: -1 });
        },
        //get post by id query
        post: async (parent, { postId }) => {
            return await Post.find({ _id: postId });
        },
    },
    