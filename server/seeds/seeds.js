const db = require('../config/connections');
const { User, Post } = require('../models');
//importing signtoken
const { signToken } = require('../utils/auth');
//importing user data
const { randomUsername, makePassword } = require('./userData');
//importing data helper funct
const { getRandomArrayItem, randomDate, randomNum } = require('./data')
//importing post data
const posts = require('./postData');
//importing comment data
const comments = require('./commentData')

db.once('open', async () => {
  try {
    //delete all collections
    await Post.deleteMany({});
    await User.deleteMany({});

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
      console.log(postID);
      const user = users.find((user) => user.user.username === post.username);

      user.user.posts.push(postID);
      console.log(user.user);
      const updatedUser = await User.collection.updateOne({ _id: user.user._id }, { $set: { posts: user.user.posts } });
      console.log(updatedUser);
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
      console.log(postComments);
      await Post.collection.updateOne({ _id: post._id }, { $set: { comments: post.comments } });
    }

    for (const user of users) {
      const friends = [];
      //create random number of friends
      const totalFriends = randomNum();
      //loop through total friends and push random user into friends array
      for (let i = 0; i <= totalFriends; i++) {
        const newFriend = (getRandomArrayItem(users)).user._id;
        console.log(newFriend);
        friends.push(newFriend);
      }
      //set friends array to user.friends
      user.user.friends = friends;
      console.log(user.user);

      await User.collection.updateOne({ _id: user.user._id }, { $set: { friends: user.user.friends } });
      }
 

    // //insert many users into db
    // await User.collection.insertMany(users);
    // //insert many posts into db
    // await Post.collection.insertMany(allPosts);

    // console.log(allPosts);
    // console.log(users);

    // users.forEach((user) => {

    //   //loop through random number of friends and push random user into friends array
    //   for (let i = 0; i <= Math.floor(Math.random() * users.length); i++) {
    //     //filtering out redundant friends
    //     const potentialFriends = users.filter((friend) => !user.friends.includes(friend) && friend._id !== user._id);

    //     //call getrandomuser funct
    //     const newFriend = getRandomUser(potentialFriends);
    //     user.friends.push(`_id: ${newFriend._id}`);
    //   }
    // });

    // //update users with friends
    // await User.collection.updateMany({}, { $set: { friends: users.friends } });

    // //update users with posts
    // await User.collection.populate('posts');



  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done! seeds are planted :3');
  process.exit(0);
});
