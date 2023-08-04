## Breakdown of base files

**Backend: [SERVER FOLDER]**
- Config
    - Connections.js
- Models
    - Index, User, Post, Comment
- Schemas
    - Index, typedefs, resolvers
- Seeds
    -Data files, seeds
- Utils
    -Auth, dateformat
-Package.json, server.js

**Frontend: [CLIENT FOLDER]**
- Public (with reactapp, we no touchy here)
- Src
    - Assets
        - css/images/etc.
    - Components
        - Commentform, commentlist, header, footer, postform, postlist
    -  Pages
        - Home, login, signup, onepost, profile
    - Utils
        - action/reducers > folder contains both files
        - queries/mutations > folder contains both files
        - Auth, usercontext
- App, index, webvitals, setuptests <- all default when create-react-app installed

### What/Who? - What data do we need 
Users, Posts, Comments

### Where? - where data is displayed/accessible (frontend)
Home page, Profile, just individual post

### How? - how users connect/interact
- Signup page, login
- Components: 
    -creating a new post, creating a new comment -> ‘form’ files, as component can be plugged into homepage or profile page?
- Activity feed or dashboard? 
    - ‘Postlist’ -> displaying list of all posts or filtered posts based on friends?
- Viewing specific post: comments for that post will be rendered (commentlist)
- Profile: adding/removing friends (button?) 
- Friendslist component -> should add/remove friend btn be here?
>>Should friends/userslist (filter users for those not already in friends list) be on homepage or profile? Should option to add friend only appear on THAT user’s profile?
- Posts and comments have a like and dislike button and counter

### What does each page contain?
Homepage?
Profile?
Signup form?

### What will function normally?
addUser, addPost, getAllUsers, getAllPosts
login/logout

### Actually, what are our base queries/mutations?
**ADD:** user, post, comment, friend
**UPDATE:** post, comment
**DELETE:** friend, post, comment
**LIKES:** post, comment
**DISLIKES:** post, comment
**QUERIES:** users, posts, comments
**Me:** get own user info, AUTH with jwt
>>liked/disliked posts?
>>Specific user, specific post

## What is our base dataflow/user interaction flow?
1. Signup > get user data, add new user to database
2. Upon success, login; if not, reload/redirect
3. Upon successful login, what page directed to? Home? Own profile (query get me)?
4. [tutorial] Set up profile > add friends > create first post > create first comment
5. [expected behavior] upon creating new post, own profile reload with post added to ‘my posts’ (again, v general concept, not necessarily endpoint)
6. [expected behavior] when adding comment to specific post, page reloads and comment has been added to comment list below post
7. [expected behavior] when adding a friend, on own profile ‘friendslist’ has updated to include added user
8. [expected behavior] when removing friend, user is removed from friends list
9. [expected behavior] when liking/disliking specific post/comment, likes/dislikes count should increment with selection
10. [expected behavior]  when clicking on user’s username, should be redirected to their profile page
11. [expected behavior] (just example!) when clicking on postlist on another user’s profile, will present with all posts they’ve written
12. [expected behavior] only self can update/delete own posts/comments/friends
13. [expected behavior] when sorting activity/posts/comments, they will appear sorted by recent (createdAt date, ascending/descending)
14. [expected behavior] if logged out, cannot interact with site

### Forms needed for frontend:
Gathering userdata from sign up form
Login with jwt auth decoding/validation
post /comment forms with text input and form submit handlers
Specific post page with likes/dislikes for post and its comments

Front end specifics:
Tutorial components - 
Bananaman figure/svg/sprite
List of prompts, and front end scripts to respond to user input/actions in tutorial
How does bananaman talk to us? Alerts? Modals? What css library can we use in react to achieve this
How will tutorial version of sign up/profile page look different? Where will bananaman go? (contained in div container?, what/where are his prompts?)
Can we call for mr bananaman when tutorial is finished? How do we get him?
What are the specific flow of events (so we can break them down into separate or cascading functions) that bananaman takes us on?
Writing out each step ex. Add bananaman as friend, on hover or settimeout (waiting) for next prompt?
What will be tutorial endpoint? Will tutorial fork into different paths or follow linear?
React ideas: how can we use custom providers and hooks to our advantage to create more features?

### What are our INTENDED behaviors for things going to be?
(these are only examples, not necessarily givens!)
Add friend removes friends
Can only edit/remove OTHER user’s posts/comments
Adding comment to specific post will add comment to a different post, page redirects to that post instead of reloading
Don’t click me button that does nothing
Nav bar with links to the wrong pages (how will the user know that they did click the right thing? Should be confused and have them click back and forth between tabs?)
Theme toggler that’s just “broken” (can only be set once, aka using an addclass method with class css properties) and changes colors to be awful and font to comic sans
Search button just opens up google home
Use builtin date/time/location from browser, retrieve weather or relevant info EXCLUDING  results for time/location
User is assigned a randomly generated username and can only run generator once or x times.

Making a fake payment gateway that steals credit card #s?
Ideas for further junk:
How can we use likes/dislikes data for each user?
Offer friend recommendations based on comparison of liked/disliked posts? (ex. Finding specific posts where user has liked and other user has disliked and if more than x matches, trigger event to display username in ‘recommended friends’ div)
Keep count of likes/dislikes, (for posts/comments or overall), trigger event to display alert/modal or “achievement” (ex. More than x dislikes, “user has earned the ‘hater’ badge!”)
Filtering posts or comments based on likes/dislikes?
How do we keep user engaged/what easter eggs to hide?
Creating ‘points’ attribute, saving to database, each action adding points behind the scenes?
Having visible points, increments when adding post or comment? [expected behavior]
Creating leaderboard to display users with point values? Rank?
If creating “rank”, [expected behavior] level of access (stuff you can manipulate on site) increases with rank status?
Creating badges or trophies: awards for stupid easter egg bullshit
Frontend scripts to check when sending updated attribute (ex. Likes/dislikes count) and triggering event
Writing out easter eggs and user interaction required to achieve them