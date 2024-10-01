//const UserModel = require("../index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../logger");
const userDetail = {
  getUsers: async (req, res) => {
    try {
      //console.log(req);
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
<<<<<<< HEAD
    const { username, password, rememberMe } = req.body;
    console.log(rememberMe);
    const SHORT_TOKEN_EXPIRY = "15m"; // 15 minutes for non-remembered logins
    const LONG_TOKEN_EXPIRY = "30d"; // 30 days for "Remember Me" logins
    console.log(typeof username);
    try {
      // Find user by username and password
      const user = await req.UserModel.findOne({
        where: {
          username: username,
        },
      });

      if (user) {
        const isSimilar = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isSimilar) {
          const tokenExpiry = rememberMe
            ? LONG_TOKEN_EXPIRY
            : SHORT_TOKEN_EXPIRY;
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
          res.status(201);
          res.send({
            status: " valid user detail, please procced further ",
            token,
          });
        } else {
          logger.warn(
            `Invalid login attempt for non-existent user: ${username},password:${password}, IP: ${
              req.ip
            }, Time: ${new Date().toISOString()}`
          );
          res.status(401); //Unauthorized
          res.send({
            error: "Wrong password",
            status: "Wrong password, Please use correct password ",
          });
        }

        // User found, return user data
      } else {
        // User not found, return 409
        logger.warn(
          `Invalid login attempt for non-existent user: ${username}, IP: ${
            req.ip
          }, Time: ${new Date().toISOString()}`
        );
        res.status(401);
        res.send({
          error: "Wrong username",
          status: "Wrong username, Please use correct username ",
=======
    const { username, password, rememberMe } = req.body; // Capture the rememberMe value
    console.log(typeof username);
    try {
        const user = await req.UserModel.findOne({
            where: { username: username },
>>>>>>> 592649378e9d04f231f975bcf90ad5b5550db587
        });

        if (user) {
            const isSimilar = await bcrypt.compare(password, user.password);
            if (isSimilar) {
                // Set token expiry based on rememberMe
                const tokenExpiry = rememberMe ? '30d' : '24h';

                const token = await jwt.sign(
                    {
                        userId: user.id,
                        email: user.email,
                        username: user.username,
                        role: "admin",
                    },
                    "No one can still my token", // Secret key
                    { expiresIn: tokenExpiry }
                );
                
                res.status(201).send({
                    status: "Valid user detail, please proceed further",
                    token,
                });
            } else {
                res.status(409).send({
                    error: "Wrong Password",
                    status: "Wrong password, please use correct password",
                });
            }
        } else {
            res.status(404).send({
                error: "User not found",
                status: "No user with this username exists",
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
        res.status(201);
        res.send({
          status: "User successfully created",
          data: newUser,
        });
      }
    } catch (error) {
      console.log("what is value inside error.name " + error.name);
      // Handle specific database errors
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400);
        res.send({
          status: "Error",
          error: "Username or email already exists",
        });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400);
        res.send({
          status: "Error",
          error: "Invalid email format",
        });
      } else {
        // General error handling
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
        res.status(404);
        res.send({
          status: "user not found ",
          error: error,
        });
      } else {
        const deletedUser = user;
        await user.destroy();
        res.status(200);
        res.send({
          message: "user deleted !",
          data: deletedUser,
        });
      }
    } catch (error) {
      res.status(500);
      res.send({ error });
    }
  },
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    try {
      const user = await req.UserModel.findByPk(userId);
      if (!username || username.length < 4) {
        res.status(400);
        res.send({
          status: "Error",
          error: "Username must be at least 4 characters long",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await user.update({
        username: username || user.username, // Update only if new username is provided
        email: email || user.email, // Update only if new email is provided
        password: hashedPassword || user.password, // Update only if new password is provided
      });
      res.status(200);
      res.send({
        status: "Success",
        message: "User Updated Successfully ",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({
        status: "Error",
        message: "error occured while updating the user in databse ",
      });
    }
  },
};

module.exports = userDetail;
