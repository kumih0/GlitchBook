//This is the static badge information that we'll have in the database to plug into the user's info as they "complete" the achievements. These are just a start but again, they will be a sub-doc that will only be added to if they are triggered by UI on front end.

//These are just a start for a few achievements. I prefer using regular js files vs json, since it gives us more wiggle room to manipulate or incorporate helper functions.

//general badge/achievements
const badgeData = [
    {
        name: 'You did it!',
        description: 'You broke the website',
        // image: '',
    },
    {
        name: 'Lonely',
        description: 'Have no friends',
        // image: '',
    },
    {
        name: 'Friendly',
        description: 'Add a friend',
        // image: '',
    },
    {
        name: 'No way out',
        description: 'Tried to log out',
        // image: '',
    },
    {
        name: 'Supportive',
        description: 'Liked three posts',
        // image: '',
    },
    {
        name: 'Hater',
        description: 'Disliked three posts',
        // image: '',
    }
]

//badges for posts (add/update/delete)
const postBadges = [
    {
        name: 'Thoughtful',
        description: 'Make your first post',
        // image: 'relevent img link here',
    },
    {
        name: 'Thunkful',
        description: 'Make three posts',
        // image: '',
    },
    {
        name: 'Word Vomit',
        description: 'Make five posts',
        // image: '',
    },
    {
        name: 'Editor',
        description: 'Update a post',
        // image: '',
    },
    {
        name: 'Retcon Extraordinaire',
        description: 'Update three posts',
        // image: '',
    },
    {
        name: 'Drunk with power',
        description: 'Update five posts',
        // image: '',
    },
    {
        name: 'Whoopsies',
        description: 'Delete a post',
        // image: '',
    },
    {
        name: 'This is trash',
        description: 'Delete three posts',
        // image: '',
    },
    {
        name: 'Garbage Collector',
        description: 'Delete five posts',
        // image: '',
    },
];

//badges for comments (add/update/delete)
const commentBadges = [
    {
        name: 'Reply Guy',
        description: 'Make your first comment',
        // image: 'link src img here'
    },
    {
        name: 'Conversationalist',
        description: 'Make three comments',
        // image: '',
    },
    {
        name: 'Mass Debator',
        description: 'Make five comments',
        // image: '',
    },
    {
        name: "That's not what I said",
        description: 'Update a comment',
        // image: '',
    },
    {
        name: 'Putting words in your mouth',
        description: 'Update three comments',
        // image: '',
    },
    {
        name: 'ULTIMATE Mass Debator',
        description: 'Update five comments',
        // image: '',
    },
    {
        name: 'Take that back',
        description: 'Delete a comment',
        // image: '',
    },
    {
        name: 'Taking out the trash',
        description: 'Delete three comments',
        // image: '',
    },
    {
        name: 'Dumpster Diver',
        description: 'Delete five comments',
        // image: '',
    },
];
//wtf is this
const allBadges = badgeData.concat(postBadges, commentBadges);

module.exports = allBadges;