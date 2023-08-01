//dumping all my stuff here since it will keep the main seeds file clean
//importing user data
const { randomUsername, makePassword } = require('./userData');
//importing data helper funct
const { getRandomArrayItem, randomDate, randomNum } = require('./data')
//importing post and comment data
const posts = require('./postData');
const comments = require('./commentData');

//wrapping inside a function so seed generation can be called and create new users and data each time
const seedUsers = () => {
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

    return users;
};


module.exports = seedUsers;
