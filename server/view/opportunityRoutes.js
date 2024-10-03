import express from 'express';
import { getOpportunity,createOpportunity,updateOpportunity,deleteOpportunity} from '../controller/opportunityController.js';

const router = express.Router();

router.get('/api/Opportunity', getOpportunity);


router.post('/api/addOpportunity',  createOpportunity);

router.put('/api/Opportunity/:id', updateOpportunity);


router.delete('/api/Opportunity/:id', deleteOpportunity);



export default router;