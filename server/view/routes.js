import express from 'express';
import userRoutes from './userRoutes.js'; 
import leadRoutes from './leadRoutes.js'; 
import opportunityRoutes from './opportunityRoutes.js'; 
import learnerRoutes from './learnerRoutes.js'; 


const router = express.Router();

router.use(userRoutes);
router.use(leadRoutes); 
router.use(opportunityRoutes);
router.use(learnerRoutes);


export default router;