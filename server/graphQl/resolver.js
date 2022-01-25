const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = {
  users: () => {
    return User.find()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },

  createUser: async (args) => {
    const hashPassword = await bcrypt.hash(args.input.password, 8);

    const user = new User({
      name: args.input.name,
      email: args.input.email,
      password: hashPassword,
      dob: args.input.dob,
      address: args.input.address,
    });

    return user
      .save()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User does not exist");
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error("Password is incorrect");
    }

    const token = jwt.sign({ user: user }, process.env.JWT_KEY);

    return { userId: user.id, token: token };
  },
};