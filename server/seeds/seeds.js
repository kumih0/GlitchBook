const db = require('../config/connections');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
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
      return array[Math.floor(Math.random() * array.length)].username;
    };

    //generate friends list for each user, map funct
    users.map((user) => {
      //create empty friends array
      const friends = [];
      //create random number of friends
      const totalFriends = Math.floor(Math.random() * users.length);
      //loop through total friends and push random user into friends array
      for (let i = 0; i <= totalFriends; i++) {
        //check the friends array and filter out any users already in the array
        const potentialFriends = users.filter((friend) => !friends.includes(friend) && friend.username !== user.username);
        //call getrandomuser funct
        const newFriend = getRandomUser(potentialFriends);

        friends.push(newFriend);
      }
      //set friends array to user.friends
      user.friends = friends;
    });
    console.log(users);

    //generate posts for each user, map funct
    users.map((user) => {
      //create empty posts array
      const userPosts = [];
      //create random number of posts
      const totalPosts = Math.floor(Math.random() * 5);
      //loop through total posts and push random post into posts array
      for (let i = 0; i <= totalPosts; i++) {
        const username = user.username;
        const createdAt = randomDate();
        const likes = randomNum();
        const dislikes = randomNum();

        userPosts.push({
          ...getRandomArrayItem(posts),
          username,
          createdAt,
          likes,
          dislikes
        });
      }
      console.log(userPosts);
      //set posts array to user.posts
      user.posts = userPosts;
    });
    console.log(users);


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
