//helper functions for random generation of seed data

//get random array item, code from miniproject
const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];

//generate a random date
const randomDate = () => {
    //creating new date object
    const date = new Date();
    //generating a random number between 0-364, (within past year)
    const randomNumberOfDays = Math.floor(Math.random() * 365);
    //setting date value to be a random day in the past year
    date.setDate(date.getDate() - randomNumberOfDays);
    //returning new date value
    return date;
};

module.exports = { getRandomArrayItem, randomDate };