const gql = require("graphql-tag");

// el signo ! se utiliza para decir que es required el tipo de dato que debe ser devuelto

// recuerda que cada definition, sea una query o una mutation necesita un resolver que ejecute la definicion.
// los resolvers son definidos para cada tipo: dentro del objecto query se definen los resolevers para cada query y denrto del objeto mutation
// se describen los resolvers para cada mutation

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
