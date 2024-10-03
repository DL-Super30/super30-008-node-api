import { UserModel } from "../postgres/postgres.js"
import bcrypt from 'bcrypt';

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
export const loginUser = async (req, res) => {
        const { username, password } = req.body;
        try {
             
             const user = await UserModel.findOne({where:{username:username}})
             if (!user) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
           console.log(user);
            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            console.log( isMatch);
            return res.status(200).json({ message: "Login successful" /*, token: token */ });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };


/**
 * @swagger
 * /api/getAll:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */

export const getAllUser = async (req, res) => {
    try {
        console.log("Incoming request to /api/getAll"); // Debugging line 1
        const users = await UserModel.findAll();
        console.log("Users fetched: ", users); // Debugging line 2

        if (users.length === 0) {
            console.log("No users found"); // Debugging line 3
            return res.status(200).json({ "error": "users not found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error in getAllUser:", error); // Debugging line 4
        return res.status(500).json({ "error": "Internal server error", message: error.message });
    }
};



/**
 * @swagger
 * /api/addUser:
 *   post:
 *     summary: Add a new user
 *     description: Create a new user with the given username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: username and password are required
 *       500:
 *         description: Internal server error
 */
 export const addUser = async (req, res) => {
    const { username, password,id} = req.body;


    // Ensure username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: "username and password are required" });
    }

    try {
       const user = await UserModel.findOne({ where: { id: id } });
        if (user === null) {
            const saltRounds = 10; // Number of salt rounds for bcrypt
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await UserModel.create({ username, password: hashedPassword, id });
            return res.status(200).json({ message: "User added successfully" });
            
  
        }
        return res.status(409).json({ message: "User already found" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": "Internal server error" });
    }
}


/**
* @swagger
* /api/user/{id}:
*   put:
*     summary: Update a user
*     description: Updates a user's details using their ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID of the user to be updated
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 example: "john_doe"
*               password:
*                 type: string
*                 example: "new_password_123"
*     responses:
*       200:
*         description: User updated successfully
*       400:
*         description: Invalid input or missing fields
*       404:
*         description: User not found
*       500:
*         description: Internal server error
*/


export const updateUser = async (req, res) => {
    let {id}   = req.params;
    const { username, password } = req.body;
  
    // Convert id to an integer
    id = parseInt(id, 10);
  
    // Debug: Log incoming parameters and body
    console.log("Request Params:", req.params); // Log params to verify id is received
    console.log("Request Body:", req.body);     // Log body to check if fields are received correctly
  
    // Validate ID and at least one field in the request body
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "A valid user ID is required in the URL" });
    }
  
    if (!username && !password) {
      return res.status(400).json({ error: "At least one field (username or password) must be provided" });
    }
  
    try {
      const user = await UserModel.findOne({ where: { id: id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const updatedData = {};
      if (username) updatedData.username = username;
      if (password) updatedData.password = password;
  
      await UserModel.update(updatedData, { where: { id: id } });
  
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  


/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const deleteUser = async (req, res) => {
    let id = req.params.id;
    id = parseInt(id, 10);
    try {
        const user = await UserModel.findOne({ where: { id: id } });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await UserModel.destroy({ where: { id: id } });

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};







