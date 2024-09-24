import express from 'express';
import { getAllUser , addUser ,updateUser ,deleteUser ,loginUser} from '../controller/userController.js';




const router=express.Router();

router.get("/api/getAll",getAllUser );
router.post("/api/addUser",addUser );
router.put("/api/user/:id", updateUser);
router.delete("/api/user/:id", deleteUser);
router.post("/api/login", loginUser);




export default router;