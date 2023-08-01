const db = require('../config/connections');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
//importing data helper funct
const { getRandomArrayItem, randomDate } = require('./data')
//importing comment data
const comments = require('./commentData')

db.once('open', async () => {
  try {
    //delete all collections
    await Post.deleteMany({});
    await User.deleteMany({});

    const user = [];


    // // Create users and store their _ids in an object for easy access

    // const user_ID = [];
    // for (const userData of userSeeds) {
    //   const user = await User.create(userData);
    //   user_ID.push(user._id);
    // }

    // // Create posts with corresponding user _ids and add comments if necessary
    // for (const postData of postSeeds) {
    //   const post = await Post.create(postData);
    //   for (const userid of user_ID) {

    //     await User.findOneAndUpdate({ _id: userid }, { $addToSet: { posts: post._id } });
    //   }
    // }

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
