import { Schema, model } from 'mongoose';
//importing commentschema as sub-document of post
import commentSchema from './Comment';

const postSchema = new Schema({
    postBody: {
        type: Text,
        required: true,
        minlength: 1,
        maxlength: 1000,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //use moment to format date
        get: createdAtVal => dateFormat(createdAtVal)
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
export default Post;