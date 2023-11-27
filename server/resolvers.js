const { getProducts, getProduct, findUserByEmail, addUser, User } = require("./database");
const bcrypt = require("bcrypt");
const { generateToken } = require("./generateToken");
const saltRounds = 10; // bcrypt

const resolvers = {
  Query: {
    getProducts: () => getProducts(),
    getProduct: (_, { id }) => getProduct(id),
  },
  Mutation: {
    signUp: async (_, { email, password }) => {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        throw new Error("User already exists with this email");
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return addUser(email, hashedPassword);
    },

    signIn: async (_, { email, password }) => {
      const user = await findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Incorrect password");
      }

      const token = generateToken(user);
      return token;
    },
  },
};

module.exports = resolvers;
