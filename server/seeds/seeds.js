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
      //set posts array to user.posts
      user.posts = userPosts;
    });

    //empty posts array
    const allPosts = [];

    //loop through users array and push each user's posts into allPosts array
    users.forEach((user) => {
      user.posts.forEach((post) => {
        allPosts.push(post);
      });
    });

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
        const username = getRandomUser(users);
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
   
    //possibly? badge data here?

    //add hardcoded user data to users array
    // users.push(...userSeeds);
    // console.log(users);
    //insert many users into db
    await User.collection.insertMany(users);
    //insert many posts into db
    await Post.collection.insertMany(allPosts);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done! seeds are planted :3');
  process.exit(0);
});
