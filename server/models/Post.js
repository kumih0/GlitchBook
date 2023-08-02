const { Schema, model } = require('mongoose');
//importing commentschema as sub-document of post
const commentSchema = require('./Comment');

const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true
    },
    postText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //use moment to format date
        get: timestamp => dateFormat(timestamp)
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [commentSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

//creating virtual to count comments
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

//creating post model
const Post = model('Post', postSchema);

//exporting post model
module.exports = Post;