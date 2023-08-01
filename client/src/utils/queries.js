export const ALL_USERS = `#graphql
query Query {
    users {
      _id
      username
      email
      password
      posts {
        _id
        createdAt
        postText
        postTitle
      }
    }
  }`;

export const GET_USER = `#graphql
  query Query($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        postText
        postTitle
        createdAt
      }
    }
  }`;

  export const ALL_POSTS = `#graphql
  query Query {
    posts {
      _id
      postText
      postTitle
      likes
      dislikes
    }
  }`;
  
  