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
router.get("/", leadDetail.getLeads);

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
router.post("/", leadDetail.createLead);

/**
 * @swagger
 * /api/leads/{leadStatus}:
 *   get:
 *     summary: Get leads by status
 *     description: Retrieve leads from the database filtered by their status
 *     parameters:
 *       - in: path
 *         name: leadStatus
 *         required: true
 *         description: Status of the leads to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of leads with the specified status
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
 *                   leadStatus:
 *                     type: string
 *       404:
 *         description: No leads found with the specified status
 */
router.get("/:leadStatus", leadDetail.getAll);

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
 *         description: Numeric ID of the lead to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lead deleted successfully
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
 *         description: Lead not found
 */
router.delete("/:leadId", leadDetail.delete);

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
router.put("/:leadId", leadDetail.updateLead);

/**
 * @swagger
 * /api/leads/{leadId}:
 *   patch:
 *     summary: Partially update a lead by ID
 *     description: Update specific fields of a lead in the database by their unique ID
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
 *     responses:
 *       200:
 *         description: Lead partially updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       404:
 *         description: Lead not found
 *       400:
 *         description: Bad request, possibly due to invalid input
 *       500:
 *         description: Internal server error
 */
router.patch("/:leadId", leadDetail.PartialUpdateLead);

/**
 * @swagger
 * /api/leads/{leadId}/convert:
 *   post:
 *     summary: Convert a lead to an opportunity or learner
 *     description: Convert a lead to either an opportunity or a learner and delete the original lead
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         description: Numeric ID of the lead to convert
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               convertTo:
 *                 type: string
 *                 enum: [opportunity, learner]
 *                 description: Specify whether to convert to an opportunity or a learner
 *     responses:
 *       200:
 *         description: Lead converted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                 data:
 *                   type: object
 *                   description: The newly created opportunity or learner
 *       400:
 *         description: Bad request, invalid conversion type
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
router.post('/:leadId/convert', leadDetail.convertLead);
module.exports = router;