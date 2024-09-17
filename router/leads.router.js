const express = require("express");
const leadDetail = require("../controllers/leads.ctrl");
//const leadValidator = require("../validation/leads.validation");

const router = express.Router();
/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Retrieve a list of leads
 *     description: Retrieve all leads from the database
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
 *         description: The number of leads to retrieve per page (for pagination)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   leadname:
 *                     type: string
 *                   email:
 *                     type: string
 */
/**
 * @swagger
 * /api/leads/{leadId}:
 *   put:
 *     summary: Update a lead by ID
 *     description: Update a single lead in the database by their unique ID
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         description: Numeric ID of the lead to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leadname:
 *                 type: string
 *                 description: The name of the lead
 *               email:
 *                 type: string
 *                 description: The email of the lead
 *               phone:
 *                 type: string
 *                 description: The phone number of the lead
 *               feeQuoted:
 *                 type: number
 *                 format: float
 *                 description: The fee quoted to the lead
 *               batchTiming:
 *                 type: string
 *                 description: The timing of the batch
 *               leadStatus:
 *                 type: string
 *                 description: The current status of the lead
 *               leadSource:
 *                 type: string
 *                 description: The source from which the lead came
 *               course:
 *                 type: string
 *                 description: The course the lead is interested in
 *               selectedClassMode:
 *                 type: string
 *                 description: The class mode selected by the lead (e.g., online, offline)
 *             required:
 *               - leadname
 *               - email
 *               - phone
 *               - feeQuoted
 *               - batchTiming
 *               - leadStatus
 *               - leadSource
 *               - course
 *               - selectedClassMode
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the lead
 *                 leadname:
 *                   type: string
 *                   description: The name of the lead
 *                 email:
 *                   type: string
 *                   description: The email of the lead
 *                 phone:
 *                   type: string
 *                   description: The phone number of the lead
 *                 feeQuoted:
 *                   type: number
 *                   format: float
 *                   description: The fee quoted to the lead
 *                 batchTiming:
 *                   type: string
 *                   description: The timing of the batch
 *                 leadStatus:
 *                   type: string
 *                   description: The current status of the lead
 *                 leadSource:
 *                   type: string
 *                   description: The source from which the lead came
 *                 course:
 *                   type: string
 *                   description: The course the lead is interested in
 *                 selectedClassMode:
 *                   type: string
 *                   description: The class mode selected by the lead (e.g., online, offline)
 *       404:
 *         description: Lead not found
 *       400:
 *         description: Bad request, possibly due to invalid input
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Create a new lead
 *     description: Add a new lead to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leadname:
 *                 type: string
 *                 description: The name of the lead
 *               email:
 *                 type: string
 *                 description: The email of the lead
 *               phone:
 *                 type: string
 *                 description: The phone number of the lead
 *               feeQuoted:
 *                 type: number
 *                 format: float
 *                 description: The fee quoted to the lead
 *               batchTiming:
 *                 type: string
 *                 description: The timing of the batch
 *               leadStatus:
 *                 type: string
 *                 description: The current status of the lead
 *               leadSource:
 *                 type: string
 *                 description: The source from which the lead came
 *               course:
 *                 type: string
 *                 description: The course the lead is interested in
 *               selectedClassMode:
 *                 type: string
 *                 description: The class mode selected by the lead (e.g., online, offline)
 *             required:
 *               - leadname
 *               - email
 *               - phone
 *               - feeQuoted
 *               - batchTiming
 *               - leadStatus
 *               - leadSource
 *               - course
 *               - selectedClassMode
 *     responses:
 *       201:
 *         description: Lead created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the lead
 *                 leadname:
 *                   type: string
 *                   description: The name of the lead
 *                 email:
 *                   type: string
 *                   description: The email of the lead
 *                 phone:
 *                   type: string
 *                   description: The phone number of the lead
 *                 feeQuoted:
 *                   type: number
 *                   format: float
 *                   description: The fee quoted to the lead
 *                 batchTiming:
 *                   type: string
 *                   description: The timing of the batch
 *                 leadStatus:
 *                   type: string
 *                   description: The current status of the lead
 *                 leadSource:
 *                   type: string
 *                   description: The source from which the lead came
 *                 course:
 *                   type: string
 *                   description: The course the lead is interested in
 *                 selectedClassMode:
 *                   type: string
 *                   description: The class mode selected by the lead (e.g., online, offline)
 *       400:
 *         description: Bad request, possibly due to invalid input
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/leads/{leadId}:
 *   delete:
 *     summary: Delete a lead by ID
 *     description: Delete a single lead from the database by their unique ID
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user deleted Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 leadname:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: lead not found
 */
router.get("/", leadDetail.getLeads);
router.post("/", leadDetail.createLead);
router.get("/:leadSatus", leadDetail.getAll);
router.delete("/:leadId", leadDetail.delete);
router.put("/:leadId", leadDetail.updateLead);
router.patch("/:leadId", leadDetail.PartialUpdateLead);
module.exports = router;
