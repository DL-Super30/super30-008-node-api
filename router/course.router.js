const express = require("express");
const upload = require("../middlewear/uploads.mdw");
const courseDetail = require("../controllers/course.ctrl");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - courseName
 *         - courseFee
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the course
 *         courseName:
 *           type: string
 *           description: Name of the course
 *         courseFee:
 *           type: string
 *           description: Fee for the course
 *         description:
 *           type: string
 *           description: Description of the course
 *         courseBrochure:
 *           type: string
 *           description: File path of the course brochure
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * /api/course:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *               courseFee:
 *                 type: string
 *               description:
 *                 type: string
 *               courseBrochure:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", upload.single("courseBrochure"), courseDetail.createCourse);

/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", courseDetail.getAllCourse);

/**
 * @swagger
 * /api/course/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *               courseFee:
 *                 type: string
 *               description:
 *                 type: string
 *               courseBrochure:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", upload.single("courseBrochure"), courseDetail.updateCourse);

/**
 * @swagger
 * /api/course/{id}:
 *   patch:
 *     summary: Partially update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *               courseFee:
 *                 type: string
 *               description:
 *                 type: string
 *               courseBrochure:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id", upload.single("courseBrochure"), courseDetail.patchCourse);

/**
 * @swagger
 * /api/course/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", courseDetail.deleteCourse);

module.exports = router;