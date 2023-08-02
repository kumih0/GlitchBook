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
    console.log(allPosts);

    //find user by username and push post into posts array
    allPosts.map((post) => {
      const username = post.username;
      const index = users.findIndex((user) => user.user.username === username);
      const postID = post._id;
      console.log(postID);
      users[index].user.posts.push(postID);
      console.log(users[index]);
    });

    //update users with posts
    await User.collection.updateMany({}, { $set: { posts: users.posts } });

    //generate random number of comments for each post
    allPosts.map((post) => {
      //create empty comments array
      const postComments = [];
      //create random number of comments
      const totalComments = randomNum();
      //grabbing post createdat date
      const postDate = post.createdAt;
      const postID = post._id;

      //random date after function, comments created after post createdat
      const randomDateAfter = () => {
        const date = new Date(postDate);
        const randomNumOfDays = Math.floor(Math.random() * 10);
        date.setDate(date.getDate() + randomNumOfDays);
        return date;
      }

      //loop through total comments and push random comment into comments array
      for (let i = 0; i <= totalComments; i++) {
        const commentText = getRandomArrayItem(comments);
        const username = (getRandomUser(users)).username;
        const createdAt = randomDateAfter(postDate);
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
      console.log(post)
    });

    //update posts with comments
    await Post.collection.updateMany({}, { $set: { comments: allPosts.comments } });





    // //generate comments for each post, map funct
    // allPosts.map((post) => {
    //   //create empty comments array
    //   const postComments = [];
    //   //create random number of comments  
    //   const totalComments = randomNum();
    //   //grab post createdat date by matching index
    //   let index = allPosts.indexOf(post);
    //   const postDate = allPosts[index].createdAt;

    //   //random date after function, comments created after post createdat
    //   const randomDateAfter = (postDate) => {
    //     const randomDate = new Date(postDate.getTime() + Math.random() * (Date.now() - postDate.getTime()));
    //     return randomDate;
    //   }

    //   //loop through total comments and push random comment into comments array
    //   for (let i = 0; i <= totalComments; i++) {
    //     const commentText = getRandomArrayItem(comments);
    //     const username = (getRandomUser(users)).username;
    //     const createdAt = randomDateAfter(postDate);
    //     const likes = randomNum();
    //     const dislikes = randomNum();

    //     postComments.push({
    //       commentText,
    //       username,
    //       createdAt,
    //       likes,
    //       dislikes
    //     });
    //   }
    //   console.log(postComments);
    //   //set comments array to post.comments
    //   post.comments = postComments;
    // });
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
