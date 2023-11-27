const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    companyName: String
    companyDescription: String
    companyCategory: String
  }

  type Cart {
    id: ID!
    userId: ID!
    productId: ID!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
  }

  type SignInResponse {
    token: String!
    user: User
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
    getUserProfileByUserId(userId: ID!): User
    getCartItemsByUserId(userId: ID!): [Product]
  }

  type Mutation {
    signUp(email: String!, password: String!): User
    signIn(email: String!, password: String!): SignInResponse
    updateProfile(userId: ID!, companyName: String, companyDescription: String, companyCategory: String): User
    addToCart(userId: ID!, productId: ID!): Cart
  }
`;

module.exports = typeDefs;
