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
      const badges = [];

      users.push({ username, email, password, friends, posts, badges });
    }
    console.log(users);

    //get random user helper funct
    const getRandomUser = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };


    // users.forEach((user) => {
    //   //loop through random number of friends and push random user into friends array
    //   for (let i = 0; i <= Math.floor(Math.random() * users.length); i++) {
    //    //filtering out redundant friends
    //    const potentialFriends = users.filter((friend) => !friends.includes(friend) && friend._id !== user._id);
    //    console.log(potentialFriends);

    //     //call getrandomuser funct
    //     const newFriend = getRandomUser(potentialFriends);
    //     console.log(newFriend);
    //     friends.push(newFriend);
    //   }
    //   //set friends array to user.friends
    //   user.friends = friends;
    // });

    //empty posts array
    const allPosts = [];

    //generating 20 posts
    for (let i = 0; i < 20; i++) {
      const username = getRandomUser(users);
      const createdAt = randomDate();
      const likes = randomNum();
      const dislikes = randomNum();

      allPosts.push({ ...getRandomArrayItem(posts), username, createdAt, likes, dislikes });
    }
    //generate comments for each post, map funct
    allPosts.map((post) => {
      //create empty comments array
      const postComments = [];
      //create random number of comments  
      const totalComments = randomNum();
      //grab post createdat date by matching index
      let index = allPosts.indexOf(post);
      const postDate = allPosts[index].createdAt;

      //random date after function, comments created after post createdat
      const randomDateAfter = (postDate) => {
        const randomDate = new Date(postDate.getTime() + Math.random() * (Date.now() - postDate.getTime()));
        return randomDate;
      }

      //loop through total comments and push random comment into comments array
      for (let i = 0; i <= totalComments; i++) {
        const commentText = getRandomArrayItem(comments);
        const username = getRandomUser(users).username;
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
      console.log(postComments);
      //set comments array to post.comments
      post.comments = postComments;
    });
    //insert many users into db
    await User.collection.insertMany(users);
    //insert many posts into db
    await Post.collection.insertMany(allPosts);

    console.log(allPosts);
    console.log(users);

    users.forEach((user) => {
      //loop through random number of friends and push random user into friends array
      for (let i = 0; i <= Math.floor(Math.random() * users.length); i++) {
        //filtering out redundant friends
        const potentialFriends = users.filter((friend) => !user.friends.includes(friend) && friend._id !== user._id);

        //call getrandomuser funct
        const newFriend = getRandomUser(potentialFriends);
        user.friends.push(`_id: ${newFriend._id}`);
      }
    });

    await User.collection.bulkWrite(users.map((user) => {
      return {
        updateOne: {
          filter: { _id: user._id },
          update: { $set: { friends: user.friends } },
          upsert: true
        }
      }
    }));

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done! seeds are planted :3');
  process.exit(0);
});
