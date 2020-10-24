const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../Utils/validator");
// parents give you the info about what was the input of the last request

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    "mysuperultrasecretConfirmLargeKey2019384756",
    { expiresIn: "2h" }
  );
};

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //  Validate user date

      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // make sure that user don't already exist

      const already_user = await User.findOne({ username });
      if (already_user) {
        throw new UserInputError("Username is taken", {
          err: {
            username: "This username is taken",
          },
        });
      }
      // has the password

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
      });
      const user = await newUser.save();

      // create an auth token
      const token = createToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username: username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("Wrong username", { errors });
      }

      const is_match = await bcrypt.compare(password, user.password);
      if (!is_match) {
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = createToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
