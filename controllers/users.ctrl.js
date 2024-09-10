//const UserModel = require("../index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const { username, password } = req.body;
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
          const token = await jwt.sign(
            {
              userId: user.id,
              email: user.email,
              username: user.username,
              role: "admin",
            },
            "No one can still my token",
            { expiresIn: "24h" }
          );
          res.status(201);
          res.send({
            status: " valid user detail, please procced further ",
            token,
          });
        }

        // User found, return user data
      } else {
        // User not found, return 409
        res.status(409);
        res.send({
          error: "Wrong Password",
          status: "Wrong Password, Please use correct password ",
        });
      }
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500);
      res.send({
        error: error,
      });
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
        const deletedUser = await user.destroy();
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
