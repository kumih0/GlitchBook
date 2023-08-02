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

  export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      username
      postTitle
      postText
      createdAt
      likes
      dislikes
      commentCount
    }
  }
  `;
  
  export const DISLIKE_POST = gql`
  mutation dislikePost($postId: ID!) {
    dislikePost(postId: $postId) {
      _id
      username
      postTitle
      postText
      createdAt
      likes
      dislikes
      commentCount
    }
  }
  `;

  export const LIKE_COMMENT = gql`
  mutation likeComment($postId: ID!, $commentId: ID!) {
    likeComment(postId: $postId, commentId: $commentId) {
      _id
      username
      postTitle
      postText
      createdAt
      likes
      dislikes
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

  export const DISLIKE_COMMENT = gql`
  mutation dislikeComment($postId: ID!, $commentId: ID!) {
    dislikeComment(postId: $postId, commentId: $commentId) {
      _id
      username
      postTitle
      postText
      createdAt
      likes
      dislikes
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

  export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      username
      postTitle
      postText
      createdAt
    }
  }
  `;

export const DELETE_COMMENT = gql`
mutation deleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(postId: $postId, commentId: $commentId) {
    _id
    username
    postTitle
    postText
    createdAt
    commentCount
    comments {
      _id
      commentText
      username
    }
  }
}
`;

export const DELETE_FRIEND = gql`
mutation deleteFriend($username: String!, $friendId: ID!) {
  deleteFriend(username: $username, friendId: $friendId) {
    _id
    username
    friendCount
    friends {
      _id
      username
    }
  }
}
`;
//userid???
export const ADD_BADGE = gql`
mutation addBadge($badgeId: ID!) {
  addBadge(badgeId: $badgeId) {
    _id
    username
    badges {
      _id
      name
      description
    }
  }
}
`;