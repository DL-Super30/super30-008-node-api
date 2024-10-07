import express from 'express';
import { getCourse, createCourse, updateCourse, deleteCourse } from '../controller/coursesController.js';

const router = express.Router();

router.get('/api/Courses', getCourse);

router.post('/api/addCourses', createCourse);

router.put('/api/Courses/:id', updateCourse);


router.delete('/api/Courses/:id', deleteCourse);



export default router;
