import gql from "graphql-tag";
export const Fetch_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
