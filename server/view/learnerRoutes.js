import express from 'express';
import { getLearner,createLearner,updateLearner,deleteLearner} from '../controller/learnerController.js';

const router = express.Router();

router.get('/api/Learner', getLearner);


router.post('/api/addLearner',  createLearner);

router.put('/api/Learner/:id', updateLearner);


router.delete('/api/Learner/:id', deleteLearner);



export default router;