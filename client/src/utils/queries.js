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