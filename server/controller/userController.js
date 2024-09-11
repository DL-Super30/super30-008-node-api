import { UserModel } from "../postgres/postgres.js"
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
    const { name, password } = req.body;
    try {
         
         const user = await UserModel.findOne({where:{name:name}})
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

export const getAllUser=async(req,res)=>{
    try{
        const users= await UserModel.findAll();
        if(users.lenght==0){
            return res.status(200).json({"error":"users not found"})
        }
        return res.status(200).json(users)
    }catch(error){
        console.log(error)
        return res.status(500).json({"error":"Internal server error"})
    }
}

export const addUser = async (req, res) => {
    const { name, password,id} = req.body;


    // Ensure name and password are provided
    if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    try {
       const user = await UserModel.findOne({ where: { id: id } });
        if (user === null) {
            const saltRounds = 10; // Number of salt rounds for bcrypt
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await UserModel.create({ name, password: hashedPassword, id });
            return res.status(200).json({ message: "User added successfully" });
            
  
        }
        return res.status(201).json({ message: "User already found" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": "Internal server error" });
    }
}


export const updateUser = async (req, res) =>{
    const  id  = req.params.id;
    const { name, password } = req.body;
     if (!name && !password) {
      return res.status(400).json({ error: "At least one field (name or password) must be provided" });
    }
    try{
        const user = await UserModel.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
            }
        const updatedData = {};
        if (name) updatedData.name = name;
        if (password) updatedData.password = password;
          await UserModel.update(updatedData, { where: { id: id } });
        return res.status(200).json({ message: "User updated successfully" });

        
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Internal server error"});
    }

}


export const deleteUser = async (req, res) => {
    const id = req.params.id;

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








