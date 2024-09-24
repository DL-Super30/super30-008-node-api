import express from 'express';
import { getAllLeads, createLead,getAllLeadsByStatus, updateLead, deleteLead } from '../controller/leadController.js';

const router = express.Router();

router.get('/api/leads', getAllLeads);
router.get('/api/getAllLeadsByStatus', getAllLeadsByStatus);

router.post('/api/addlead',  createLead);

router.put('/api/leads/:id', updateLead);


router.delete('/api/leads/:id', deleteLead);



export default router;
