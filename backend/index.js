const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

//  grapql definitions

const typeDefs = require("./graphql/tyepeDef");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // we need to forward the request so we can later extract info about all request that get to the server
});

const uriDB =
  "mongodb+srv://Robert:passwordSegura20@first-cluster.s2e70.mongodb.net/merng_proyect?retryWrites=true&w=majority";

mongoose
  .connect(uriDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    server.listen({ port: 5000 }).then((result) => {
      console.log("the server is running at", result.url);
    });
  })
  .catch((err) => {
    console.log(err);
  });
