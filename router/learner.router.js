const express = require("express");
const learnerDetail = require("../controllers/learner.ctrl");
//const leadValidator = require("../validation/leads.validation");

const router = express.Router();
/**
 * @swagger
 * /api/learner:
 *   get:
 *     summary: Retrieve a list of Learner
 *     description: Retrieve all Learner from the database
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve (for pagination)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of Learner to retrieve per page (for pagination)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of Learner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstname:
 *                     type: string
 *                   email:
 *                     type: string
 */
/**
 * @swagger
 * /api/learner/{id}:
 *   delete:
 *     summary: Delete a Learner by ID
 *     description: Delete a single Learner from the database by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single Learner detail deleted Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstname:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: lead not found
 */
/**
 * @swagger
 * /api/learner:
 *   post:
 *     summary: Create a new learner
 *     description: Add a new learner to the database with required fields (first name, phone, and email)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the learner
 *               phone:
 *                 type: string
 *                 description: The phone number of the learner
 *               email:
 *                 type: string
 *                 description: The email address of the learner
 *             required:
 *               - firstname
 *               - phone
 *               - email
 *     responses:
 *       201:
 *         description: Learner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the learner
 *                 firstName:
 *                   type: string
 *                   description: The first name of the learner
 *                 phone:
 *                   type: string
 *                   description: The phone number of the learner
 *                 email:
 *                   type: string
 *                   description: The email address of the learner
 *       400:
 *         description: Bad request, possibly due to missing or invalid fields
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/learner/{id}:
 *   put:
 *     summary: Update a existing learner
 *     description: learner detail has updated to the database with required fields (first name, phone, and email)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the learner
 *               phone:
 *                 type: string
 *                 description: The phone number of the learner
 *               email:
 *                 type: string
 *                 description: The email address of the learner
 *             required:
 *               - firstname
 *               - phone
 *               - email
 *     responses:
 *       201:
 *         description: Learner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the learner
 *                 firstName:
 *                   type: string
 *                   description: The first name of the learner
 *                 phone:
 *                   type: string
 *                   description: The phone number of the learner
 *                 email:
 *                   type: string
 *                   description: The email address of the learner
 *       400:
 *         description: Bad request, possibly due to missing or invalid fields
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/learner/{id}:
 *   patch:
 *     summary: partial update a existing learner
 *     description: learner detail has updated to the database with required fields (first name, phone, and email)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the learner
 *               phone:
 *                 type: string
 *                 description: The phone number of the learner
 *               email:
 *                 type: string
 *                 description: The email address of the learner
 *             required:
 *               - firstname
 *               - phone
 *               - email
 *     responses:
 *       201:
 *         description: Learner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the learner
 *                 firstName:
 *                   type: string
 *                   description: The first name of the learner
 *                 phone:
 *                   type: string
 *                   description: The phone number of the learner
 *                 email:
 *                   type: string
 *                   description: The email address of the learner
 *       400:
 *         description: Bad request, possibly due to missing or invalid fields
 *       500:
 *         description: Internal server error
 */
router.get("/", learnerDetail.getlearner);
router.post("/", learnerDetail.createLearner);
router.delete("/:id", learnerDetail.delete);
router.put("/:id", learnerDetail.updatelearner);
router.patch("/:id", learnerDetail.PartialUpdateLearner);
module.exports = router;