import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        _id
        password
        username
      }
    }
  }`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
  `;

  export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      email
      username
      friendCount
    }
  }
  `;
  
  export const ADD_POST = gql`
  mutation addPost($postTitle: String!, $postText: String!) {
    addPost(postTitle: $postTitle, postText: $postText) {
      _id
      username
      postTitle
      postText
      createdAt
      likes
      dislikes
    }
  }
  `;

  export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postTitle
      postText
      username
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
  }
  `;

  export const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $postTitle: String!, $postText: String!) {
    updatePost(postId: $postId, postTitle: $postTitle, postText: $postText) {
      _id
      postTitle
      postText
      username
      likes
      dislikes
      createdAt
      commentCount
      comments {
        _id
        commentText
        username
        createdAt
        likes
        dislikes
      }
    }
  }
  `;

  export const UPDATE_COMMENT = gql`
  mutation updateComment($postId: ID!, $commentId: ID!, $commentText: String!) {
    updateComment(postId: $postId, commentId: $commentId, commentText: $commentText) {
      _id
      postTitle
      postText
      username
      likes
      dislikes
      createdAt
      commentCount
      comments {
        _id
        commentText
        username
        createdAt
        likes
        dislikes
      }
    }
  }
  `;