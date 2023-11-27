const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { initializeDb } = require("./database");
require("dotenv").config();

const server = new ApolloServer({ typeDefs, resolvers });

initializeDb().then(() => {
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
});
