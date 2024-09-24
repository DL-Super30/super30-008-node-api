import express from 'express';
import userRoutes from './userRoutes.js'; 
import leadRoutes from './leadRoutes.js'; 

const router = express.Router();

router.use(userRoutes);
router.use(leadRoutes); 

export default router;