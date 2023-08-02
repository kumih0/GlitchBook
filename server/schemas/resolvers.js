const { GraphQLError } = require('graphql');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //get me query
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('posts').populate('friends');
            }

           throw new GraphQLError('Not logged in', {
            extensions: {
                code: 'UNAUTHENTICATED',
            },
           });
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
        posts: async () => {
            return await Post.find().sort({ createdAt: -1 });
        },
        //get all posts by user query
        postsByUser: async (parent, { username }) => {
            const params = username ? { username } : {};
            return await Post.find(params).sort({ createdAt: -1 });
        },
        //get post by id query
        post: async (parent, { postId }) => {
            return await Post.findOne({ _id: postId });
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
                throw new GraphQLError('No user found with this email address', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        },
                    });
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new GraphQLError('Incorrect credentials', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        },
                });
            }

            const token = signToken(user);
            return { token, user };
        },
        //add post mutation
        addPost: async (parent, { postTitle, postText }, context) => {
            if (context.user) {
                const post = await Post.create({
                    postTitle,
                    postText,
                    username: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: post._id } }
                );

                return post;
            }
            throw new GraphQLError('Not logged in', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                },
               });
        },
        //add comment mutation
        addComment: async (parent, { postId, commentText }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { comments: { commentText, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            }

            throw new GraphQLError('Not logged in', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                },
               });
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
        updatePost: async (parent, { postId, postTitle, postText }, { username }) => {
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { postTitle, postText, username: username },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            } catch (err) {
                console.log(err);
            }
        },
        //update comment mutation
        updateComment: async (parent, { postId, commentId, commentText }, context) => {//context.user.username?
            try {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $set: { 'comments.$[comment].commentText': commentText } },
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

module.exports = resolvers;