import express from 'express';
import { getAllUser , addUser ,updateUser ,deleteUser ,loginUser} from '../controller/userController.js';




const router=express.Router();
router.get("/getAll",getAllUser );
router.post("/addUser",addUser );
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/login", loginUser);


export default router;