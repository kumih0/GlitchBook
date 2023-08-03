const db = require('../config/connections');
const { User, Post } = require('../models');
const  Badges  = require('../models/Badges.js');
//importing signtoken
const { signToken } = require('../utils/auth');
//importing user data
const { randomUsername, makePassword } = require('./userData');
//importing data helper funct
const { getRandomArrayItem, randomDate, randomNum } = require('./data')
const fs = require('fs');
//importing post data
const posts = require('./postData');
//importing comment data
const comments = require('./commentData')
//importing badge data
const allBadges = require('./badgeData/badgeData');

db.once('open', async () => {
  try {
    //delete all collections
    await Post.deleteMany({});
    await User.deleteMany({});

    //create badges
    const badges = await Badges.insertMany(allBadges);
    console.log(badges);

    //creating empty users array
    const users = [];
    //creating 15 users
    for (let i = 0; i < 15; i++) {
      const username = randomUsername();
      const email = username + '@email.com';
      const password = makePassword(i);
      const friends = [];
      const posts = [];

      const user = await User.create({ username, email, password, friends, posts });
      const token = signToken(user);
      await User.collection.updateOne({ _id: user._id }, { $set: { token: token } });

      fs.appendFile('userDataSeeds.json', JSON.stringify({username, email, password }) + '\n' + JSON.stringify(user._id), (err) => console.log(err ? err : 'it worked dummy '));
      users.push({ user, token });
    }
    console.log(users);

    //get random user helper funct
    const getRandomUser = (array) => {
      return array[Math.floor(Math.random() * array.length)].user.username;
    };

    //empty posts array
    const allPosts = [];

    //generating 20 posts
    for (let i = 0; i < 20; i++) {
      const username = getRandomUser(users);
      const createdAt = randomDate();
      const likes = randomNum();
      const dislikes = randomNum();

      const post = await Post.create({ ...getRandomArrayItem(posts), username, createdAt, likes, dislikes });
      allPosts.push(post);
    }
    //updating users with post_ids for populate funct
    for (const post of allPosts) {
      const postID = post._id;
      
      const user = users.find((user) => user.user.username === post.username);

      user.user.posts.push(postID);
      
      const updatedUser = await User.collection.updateOne({ _id: user.user._id }, { $set: { posts: user.user.posts } });
      
    }

    for (const post of allPosts) {
      const postComments = [];
      //create random number of comments
      const totalComments = randomNum();
      //loop through total comments and push random comment into comments array
      for (let i = 0; i <= totalComments; i++) {
        const commentText = getRandomArrayItem(comments);
        const username = getRandomUser(users);
        const createdAt = randomDate();
        const likes = randomNum();
        const dislikes = randomNum();

        postComments.push({
          commentText,
          username,
          createdAt,
          likes,
          dislikes
        });
      }
      //set comments array to post.comments
      post.comments = postComments;
      await Post.collection.updateOne({ _id: post._id }, { $set: { comments: post.comments } });
    }

    for (const user of users) {
      const friends = [];
      //create random number of friends
      const totalFriends = randomNum();
      //loop through total friends and push random user into friends array
      for (let i = 0; i <= totalFriends; i++) {
        const newFriend = (getRandomArrayItem(users)).user._id;
        friends.push(newFriend);
      }
      //set friends array to user.friends
      user.user.friends = friends;

      await User.collection.updateOne({ _id: user.user._id }, { $set: { friends: user.user.friends } });
      }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done! seeds are planted :3');
  process.exit(0);
});
