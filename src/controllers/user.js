"use strict";

const securePassword = require("secure-password");

// External Dependancies
const boom = require("boom");

// Get Data Models
const User = require("../models/user");

module.exports = fastify => ({
  signUp: async (req, reply) => {
    const pwd = securePassword();
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const role = req.body.role;

    const hashedPassword = await pwd.hash(Buffer.from(password));

    try {
      const newUser = new User({
        email: email,
        password: hashedPassword,
        name: name,
        role: role
      });

      const user = await newUser.save();
      const token = await reply.jwtSign({ id: user._id, role: user.role });

      reply.code(201).send({ user: user, token: token });
    } catch (err) {
      throw boom.boomify(err);
    }
  },

  getUser: async (req, reply) => {
    try {
      const users = await User.find();
      reply.code(201).send(users);
    } catch (err) {
      throw boom.boomify(err);
    }
  },

  loginUser: async (req, reply) => {
    const pwd = securePassword();
    const email = req.body.email;
    const password = req.body.password;

    let user = await User.findOne({ email: email });

    if (!user) {
      reply.unauthorized("Incorret email or password!");

      return;
    }
    const pass = Buffer.from(user.password);
    const result = await pwd.verify(Buffer.from(password), pass);

    switch (result) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
        reply.internalServerError("Invalid or unrecognized hash.");

        return;
      case securePassword.INVALID:
        reply.unauthorized("Incorrect email or password.");

        return;
      case securePassword.VALID_NEEDS_REHASH:
        const hashedPassword = await pwd.hash(Buffer.from(password));
        user.password = hashedPassword;
        user = await user.save();
        console.log("Yay you made it, wait for us to improve your safety");
    }

    // if (result === securePassword.INVALID_UNRECOGNIZED_HASH) {
    //   reply.internalServerError("Invalid or unrecognized hash.");

    //   return;
    // } else if (result === securePassword.INVALID) {
    //   reply.unauthorized("Incorrect email or password.");

    //   return;
    // } else if (result === securePassword.VALID_NEEDS_REHASH) {
    //   const hashedPassword = await pwd.hash(Buffer.from(password));

    //   user.password = hashedPassword;
    //   user = await user.save();
    // }

    const token = await reply.jwtSign({ id: user._id, role: user.role });

    reply.code(200).send({ user: user, token: token });
  }
});
