//importing user data
const { randomUsername, makePassword } = require('./userData');
//importing data helper funct
const { getRandomArrayItem, randomDate } = require('./data')

//wrapping inside a function so seed generation can be called and create new users each time

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
return users;
};

module.exports = seedUsers;
