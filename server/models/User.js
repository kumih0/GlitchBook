//importing schema and models from mongoose
const { Schema, model } = require('mongoose');
//importing bcrypt for password hashing
const bcrypt = require('bcrypt');

//creating user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //validating email
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    //creating friends array, self-reference
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    //posts array, referencing post model
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    //badges array, referencing badge model. sub doc to user
    badges: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Badges'
        }
    ],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });

//saving hashed password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//creating method to compare and validate password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//creating virtual to count friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//creating virtual to count total posts
userSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

//creating virtual to count total badges
userSchema.virtual('badgeCount').get(function () {
    return this.badges.length;
});

//creating user model
const User = model('User', userSchema);

//exporting user model
module.exports = User;