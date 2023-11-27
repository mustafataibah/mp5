const {
  getProducts,
  getProduct,
  findUserByEmail,
  addUser,
  updateProfile,
  addToCart,
  getCartItemsByUserId,
} = require("./database");
const bcrypt = require("bcrypt");
const { generateToken } = require("./generateToken");
const { get } = require("http");
const saltRounds = 10; // bcrypt

const resolvers = {
  Query: {
    getProducts: () => getProducts(),
    getProduct: (_, { id }) => getProduct(id),
    getCartItemsByUserId: (_, { userId }) => getCartItemsByUserId(userId),
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
      return { token, user };
    },
    updateProfile: async (_, { userId, companyName, companyDescription, companyCategory }) => {
      return updateProfile(userId, companyName, companyDescription, companyCategory);
    },
    addToCart: async (_, { userId, productId }) => {
      return addToCart(userId, productId);
    },
  },
};

module.exports = resolvers;
