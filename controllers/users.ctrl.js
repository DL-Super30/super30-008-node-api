const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../logger");

const userDetail = {
  getUsers: async (req, res) => {
    try {
      const userInfo = await req.UserModel.findAll();
      res.send({
        status: "get the users ",
        data: userInfo,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await req.UserModel.findByPk(userId);
      console.log(" datatype of table " + typeof user);
      if (user) {
        res.send({
          status: "got the user info by given ID",
          data: user,
        });
      } else {
        res.send({
          status: "user not found or not exist ",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  loginUser: async (req, res) => {
    const { username, password, rememberMe } = req.body;
    console.log(rememberMe);
    const SHORT_TOKEN_EXPIRY = "15m";
    const LONG_TOKEN_EXPIRY = "30d";
    console.log(typeof username);
    try {
      const user = await req.UserModel.findOne({
        where: {
          username: username,
        },
      });

      if (user) {
        const isSimilar = await bcrypt.compare(password, user.password);
        if (isSimilar) {
          const tokenExpiry = rememberMe ? LONG_TOKEN_EXPIRY : SHORT_TOKEN_EXPIRY;
          const token = await jwt.sign(
            {
              userId: user.id,
              email: user.email,
              username: user.username,
              role: "admin",
            },
            "No one can still my token",
            { expiresIn: tokenExpiry }
          );
          res.status(201).send({
            status: " valid user detail, please procced further ",
            token,
          });
        } else {
          logger.warn(
            `Invalid login attempt for user: ${username}, IP: ${req.ip}, Time: ${new Date().toISOString()}`
          );
          res.status(401).send({
            error: "Wrong password",
            status: "Wrong password, Please use correct password ",
          });
        }
      } else {
        logger.warn(
          `Invalid login attempt for non-existent user: ${username}, IP: ${req.ip}, Time: ${new Date().toISOString()}`
        );
        res.status(401).send({
          error: "Wrong username",
          status: "Wrong username, Please use correct username ",
        });
      }
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).send({ error });
    }
  },

  registerUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await req.UserModel.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      if (newUser) {
        res.status(201).send({
          status: "User successfully created",
          data: newUser,
        });
      }
    } catch (error) {
      console.log("what is value inside error.name " + error.name);
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).send({
          status: "Error",
          error: "Username or email already exists",
        });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400).send({
          status: "Error",
          error: "Invalid email format",
        });
      } else {
        res.status(500).send({
          status: "Error",
          error: "An error occurred during registration",
        });
      }
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await req.UserModel.findByPk(userId);
      if (!user) {
        res.status(404).send({
          status: "user not found ",
        });
      } else {
        const deletedUser = user;
        await user.destroy();
        res.status(200).send({
          message: "user deleted !",
          data: deletedUser,
        });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    try {
      const user = await req.UserModel.findByPk(userId);
      if (!user) {
        return res.status(404).send({
          status: "Error",
          error: "User not found",
        });
      }
      if (username && username.length < 4) {
        return res.status(400).send({
          status: "Error",
          error: "Username must be at least 4 characters long",
        });
      }
      const updatedUser = await user.update({
        username: username || user.username,
        email: email || user.email,
        password: password ? await bcrypt.hash(password, 10) : user.password,
      });
      res.status(200).send({
        status: "Success",
        message: "User Updated Successfully ",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Error",
        message: "error occurred while updating the user in database ",
      });
    }
  },
};

module.exports = userDetail;