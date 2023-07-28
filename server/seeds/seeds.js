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
    for (const userData of userSeeds) {
      const user = await User.create(userData);
      userMap[user.username] = user._id;
    }

    // Create posts with corresponding user _ids and add comments if necessary
    for (const postData of postSeeds) {
      const postAuthorId = userMap[postData.username];
      const post = await Post.create({
        ...postData,
        username: undefined, // We don't want to store username in post collection
        postAuthor: postAuthorId // Associate the post with the user by using postAuthor field
      });

      // If you have comments data in the postSeeds.json, add them to the post
      if (postData.comments && postData.comments.length > 0) {
        post.comments = postData.comments.map(comment => ({
          ...comment,
          username: undefined, // We don't want to store username in comments
          commentAuthor: userMap[comment.username] // Associate the comment with the user by using commentAuthor field
        }));
        await post.save();
      }

      // Add the post _id to the user's posts array
      await User.findOneAndUpdate(
        { _id: postAuthorId },
        {
          $addToSet: {
            posts: post._id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
