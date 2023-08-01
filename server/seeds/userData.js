//import helper functions
const { getRandomArrayItem } = require('./data')
//ripped from hw 18
//array of random adjectives 
const randomAdjectiveArray = [
    'amazing',
    'apathetic',
    'arrogant',
    'belligerent',
    'benevolent',
    'boring',
    'ballsy',
    'brave',
    'casual',
    'cocky',
    'crazy',
    'cute',
    'daring',
    'dashing',
    'disgusting',
    'dumb',
    'devious',
    'eager',
    'eccentric',
    'elegant',
    'evil',
    'fearless',
    'fierce',
    'friendly',
    'funky',
    'funny',
    'furious',
    'generous',
    'gigantic',
    'gloomy',
    'goofy',
    'graceful',
    'grumpy',
    'handsome',
    'happy',
    'hilarious',
    'humble',
    'hungry',
    'ignorant',
    'insane',
    'intelligent',
    'jovial',
    'juvenile',
    'kind',
    'lazy',
    'lonely',
    'lethargic',
    'lucky',
    'magnificent',
    'maniacal',
    'mellow',
    'miserable',
    'naughty',
    'nervous',
    'nice',
    'obnoxious',
    'optimistic',
    'outrageous',
    'pitiful',
    'pompous',
    'questionable',
    'quaint',
    'rational',
    'rebellious',
    'rustic',
    'sassy',
    'savage',
    'tactful',
    'tense',
    'terrifying',
    'tired',
    'tasmanian',
    'ugly',
    'unusual',
    'vicious',
    'viscous',
    'violent',
    'wacky',
    'wasteful',
    'wobbly',
    'wonderful',
    'young',
    'zany',
    'zealous'
];

//array of random nouns
const randomNounArray = [
    'aardvark',
    'albatross',
    'alligator',
    'alpaca',
    'anus',
    'asphalt',
    'axolotl',
    'acorn',
    'apple',
    'banana',
    'button',
    'bucket',
    'butt',
    'butter',
    'boogers',
    'batteries',
    'biscuit',
    'cactus',
    'cannon',
    'carrot',
    'caterpillar',
    'chicken',
    'chimichanga',
    'cat',
    'dog',
    'dolphin',
    'dinosaur',
    'disappointment',
    'dishwasher',
    'dirt',
    'donkey',
    'dumpling',
    'dust',
    'earwax',
    'egg',
    'elephant',
    'eyeball',
    'fart',
    'fairy',
    'food',
    'frog',
    'giraffe',
    'goat',
    'garbage',
    'goblin',
    'gremilin',
    'gargoyle',
    'hedgehog',
    'hippo',
    'horse',
    'hamburger',
    'iguana',
    'jellyfish',
    'jerk',
    'kangaroo',
    'koala',
    'kumquat',
    'lemon',
    'lizard',
    'llama',
    'mango',
    'monkey',
    'muffin',
    'narwhal',
    'ninja',
    'noodle',
    'octopus',
    'ostrich',
    'otter',
    'panda',
    'penguin',
    'pickle',
    'pig',
    'pigeon',
    'pizza',
    'potato',
    'puppy',
    'quail',
    'quiche',
    'ravioli',
    'rhino',
    'robot',
    'sock',
    'squirrel',
    'taco',
    'toad',
    'turd',
    'turtle',
    'unicorn',
    'vampire',
    'vulture',
    'walrus',
    'waffle',
    'weasel',
    'whale',
    'worm',
    'yearbook',
    'yogurt',
    'zebra',
    'zombie'
];

//generate a random username
const randomUsername = () =>
    `${getRandomArrayItem(randomAdjectiveArray)}${getRandomArrayItem(randomNounArray)}${Math.floor(Math.random() * 100 + 1)}`;

//making basic password
const makePassword = (index) => {
    return password = `password${index}`
};

module.exports = {randomUsername, makePassword};