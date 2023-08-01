This is where I'll be writing out my process for the randomized seed generation.

Our main collections will be Users and Posts. Comments and Badges are both sub document to those main collections.

We want to have the seed data randomly generated to an extent in order to confirm that our routes, mutations, and queries are all working.  Having new seed data every time help us confirm that these are working properly, vs having static json elements that might not interact the same way as the dynamically created/updated data would in practice.

Also having a larger set of seed data for posts and comments gives us a better base to work from originally to create our various manipulations for the front end and gives the front end more stuff to work with that actually interacts with the database so we can confirm where things are connecting/not in real time/practice.

Creating a random set of users based on userdata:
    - username (reused from prev hw)
    - will have hardcoded base users for test use

Creating randomized post list for each user (hw 18)

Creating random created at dates FOR FUN

Creating randomized friends list (hw 18)

Creating randomized comments list

Creating randomized badges achieved, rando dates

random number for likes/dislikes