const { gql } = require('@apollo/client');
export const ALL_USERS = gql`
query allUsers {
  users {
    _id
    username
    email
    friends {
      _id
      username
      email
    }
    posts {
      _id
      postTitle
      postText
      createdAt
      likes
      dislikes
      comments {
        _id
        commentText
        username
        createdAt
        likes
        dislikes
      }
      commentCount
    }
    friendCount
  }
}`;

export const GET_USER = gql`
query getUser($username: String!) {
  user(username: $username) {
    _id
    username
    email
    posts {
      _id
      postTitle
      postText
      likes
      dislikes
      createdAt
      commentCount
    }
    friendCount
    friends {
      username
      email
      _id
    }
  }
}`;

export const GET_ME = gql`
query me {
  me {
    _id
    email
    username
    friendCount
    posts {
      _id
      postTitle
      postText
      username
      createdAt
      likes
      dislikes
      commentCount
    }
    friends {
      _id
      username
      email
    }
  }
}`;

  export const ALL_POSTS = gql`
  query Query {
    posts {
      _id
      postText
      postTitle
      likes
      dislikes
    }
  }`;
  
  