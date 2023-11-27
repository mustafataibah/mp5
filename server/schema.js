const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    signUp(email: String!, password: String!): User
    signIn(email: String!, password: String!): String
  }
`;

module.exports = typeDefs;
