const db = require('../config/connections');
const { User, Post, Comment } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');

db.once('open', async () => {
  try {
    await Post.deleteMany({});
    await User.deleteMany({});
    // await Comment.deleteMany({});

    // Create users and store their _ids in an object for easy access
    const userMap = {};
    const user_ID = [];
    for (const userData of userSeeds) {
      const user = await User.create(userData);
    //   userMap[user.username] = user._id;
        user_ID.push(user._id);
    }

    // Create posts with corresponding user _ids and add comments if necessary
    for (const postData of postSeeds) {
        // console.log(userMap[0])
    //   const postAuthorId = userMap[postData.username];
    //   console.log("hello", postAuthorId);
    //   const { postTitle, postText, username, comments, ...rest } = postData;

    //   const post = await Post.create({
    //     postTitle, // Use postTitle from the postSeeds.json
    //     postText, // Use postText from the postSeeds.json
    //     username, // Use username from the postSeeds.json
    //     postAuthor: postAuthorId, // Associate the post with the user by using postAuthor field
    //     ...rest // Include any other properties from the postSeeds.json if needed
    //   });
const post =await Post.create(postData);
for (const userid of user_ID) {

    await User.findOneAndUpdate({ _id: userid }, { $addToSet: { posts: post._id } });
}

      // If you have comments data in the postSeeds.json, add them to the post
    //   if (comments && comments.length > 0) {
    //     post.comments = comments.map(comment => ({
    //       commentText: comment.commentText, // Use commentText from the postSeeds.json
    //       username: comment.username // Use username from the postSeeds.json
    //     }));
    //     await post.save();
    //   }

      // Add the post _id to the user's posts array
    //   await User.findOneAndUpdate(
    //     { _id: postAuthorId },
    //     {
    //       $addToSet: {
    //         posts: post._id,
    //       },
    //     }
    //   );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
