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
    Mutation: {
        //add user mutation
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        //login mutation
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        //add post mutation
        addPost: async (parent, { postBody }, context) => {
            if (context.user) {
                const post = await Post.create({
                    postTitle,
                    postBody,
                    username: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: post._id } }
                );

                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        //add comment mutation
        addComment: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { comments: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        //add friend mutation
        addFriend: async (parent, { friendId }, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            } catch (err) {
                console.log(err);
            }
        },
        //update post mutation
        updatePost: async (parent, { postId, postTitle, postBody }, context) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { postTitle, postBody },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //update comment mutation
        updateComment: async (parent, { postId, commentId, commentBody }, context) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $set: { 'comments.$[comment].commentBody': commentBody } },
                    { arrayFilters: [{ 'comment._id': commentId }], new: true }
                );

                return updatedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //like post mutation
        likePost: async (parent, { postId }, context) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $inc: { likes: 1 } },
                    { new: true }
                );

                return updatedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //dislike post mutation
        dislikePost: async (parent, { postId }, context) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $inc: { dislikes: 1 } },
                    { new: true }
                );

                return updatedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //like comment mutation
        likeComment: async (parent, { postId, commentId }, context) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $inc: { 'comments.$[comment].likes': 1 } },
                    { arrayFilters: [{ 'comment._id': commentId }], new: true }
                );

                return updatedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //dislike comment mutation
        dislikeComment: async (parent, { postId, commentId }, context) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $inc: { 'comments.$[comment].dislikes': 1 } },
                    { arrayFilters: [{ 'comment._id': commentId }], new: true }
                );

                return updatedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //delete post mutation
        deletePost: async (parent, { postId }, context) => {
            try {
                const deletedPost = await Post.findOneAndDelete({ _id: postId });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: postId } }
                );

                return deletedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //delete comment mutation
        deleteComment: async (parent, { postId, commentId }, context) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $pull: { comments: { _id: commentId } } },
                    { new: true }
                );

                return updatedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //remove friend mutation
        deleteFriend: async (parent, { friendId }, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            } catch (err) {
                console.log(err);
            }
        },
    },
};