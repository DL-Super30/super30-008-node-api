const express = require("express");
const opportunityDetail = require("../controllers/opportunity.ctrl");
//const leadValidator = require("../validation/leads.validation");

const router = express.Router();
/**
 * @swagger
 * /api/opportunity:
 *   get:
 *     summary: Retrieve a list of Opportunities
 *     description: Retrieve all Opportunities from the database
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
 *         description: The number of opportunities to retrieve per page (for pagination)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of opportunities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
/**
 * @swagger
 * /api/opportunity:
 *   post:
 *     summary: Create a new Opportunity
 *     description: Add a new Opportunity to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the opportunity
 *               cc:
 *                 type: string
 *                 description: The country code of the opportunity's phone number
 *               phone:
 *                 type: string
 *                 description: The phone number of the opportunity
 *               email:
 *                 type: string
 *                 description: The email of the opportunity
 *               feeQuoted:
 *                 type: number
 *                 format: float
 *                 description: The fee quoted to the opportunity
 *               batchTiming:
 *                 type: string
 *                 description: The timing of the batch
 *               leadStatus:
 *                 type: string
 *                 description: The current status of the opportunity
 *               stack:
 *                 type: string
 *                 description: The technology stack of the opportunity
 *               ClassMode:
 *                 type: string
 *                 description: The class mode selected by the opportunity (e.g., online, offline)
 *               opportunityStatus:
 *                 type: string
 *                 description: The status of the opportunity
 *               opportunitySatge:
 *                 type: string
 *                 description: The stage of the opportunity (e.g., initial, negotiation)
 *               DemoAttendedStage:
 *                 type: string
 *                 description: The demo attendance stage of the opportunity
 *               visitedStage:
 *                 type: string
 *                 description: The visited stage of the opportunity
 *               lostOpportunityReason:
 *                 type: string
 *                 description: The reason for losing the opportunity (if applicable)
 *               nextFollowUp:
 *                 type: string
 *                 description: The date of the next follow-up for the opportunity
 *               leadSource:
 *                 type: string
 *                 description: The source from which the opportunity came
 *               course:
 *                 type: string
 *                 description: The course the opportunity is interested in
 *               description:
 *                 type: string
 *                 description: Additional description or comments on the opportunity
 *             required:
 *               - name
 *               - cc
 *               - phone
 *               - email
 *               - feeQuoted
 *               - batchTiming
 *               - leadStatus
 *               - stack
 *               - ClassMode
 *               - opportunityStatus
 *               - opportunitySatge
 *               - DemoAttendedStage
 *               - visitedStage
 *               - lostOpportunityReason
 *               - nextFollowUp
 *               - leadSource
 *               - course
 *               - description
 *     responses:
 *       201:
 *         description: Opportunity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the opportunity
 *                 name:
 *                   type: string
 *                   description: The name of the opportunity
 *                 cc:
 *                   type: string
 *                   description: The country code of the opportunity's phone number
 *                 phone:
 *                   type: string
 *                   description: The phone number of the opportunity
 *                 email:
 *                   type: string
 *                   description: The email of the opportunity
 *                 feeQuoted:
 *                   type: number
 *                   format: float
 *                   description: The fee quoted to the opportunity
 *                 batchTiming:
 *                   type: string
 *                   description: The timing of the batch
 *                 leadStatus:
 *                   type: string
 *                   description: The current status of the opportunity
 *                 stack:
 *                   type: string
 *                   description: The technology stack of the opportunity
 *                 ClassMode:
 *                   type: string
 *                   description: The class mode selected by the opportunity
 *                 opportunityStatus:
 *                   type: string
 *                   description: The status of the opportunity
 *                 opportunitySatge:
 *                   type: string
 *                   description: The stage of the opportunity
 *                 DemoAttendedStage:
 *                   type: string
 *                   description: The demo attendance stage of the opportunity
 *                 visitedStage:
 *                   type: string
 *                   description: The visited stage of the opportunity
 *                 lostOpportunityReason:
 *                   type: string
 *                   description: The reason for losing the opportunity (if applicable)
 *                 nextFollowUp:
 *                   type: string
 *                   description: The date of the next follow-up for the opportunity
 *                 leadSource:
 *                   type: string
 *                   description: The source from which the opportunity came
 *                 course:
 *                   type: string
 *                   description: The course the opportunity is interested in
 *                 description:
 *                   type: string
 *                   description: Additional description or comments on the opportunity
 *       400:
 *         description: Bad request, possibly due to invalid input
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/opportunity/{id}:
 *   delete:
 *     summary: Delete a Opportunity by ID
 *     description: Delete a single Opportunity from the database by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
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
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: lead not found
 */
/**
 * @swagger
 * /api/opportunity/{id}:
 *   put:
 *     summary: Update an Opportunity by ID
 *     description: Update a single Opportunity in the database by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the opportunity to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the opportunity
 *               cc:
 *                 type: string
 *                 description: The country code of the opportunity's phone number
 *               phone:
 *                 type: string
 *                 description: The phone number of the opportunity
 *               email:
 *                 type: string
 *                 description: The email of the opportunity
 *               feeQuoted:
 *                 type: number
 *                 format: float
 *                 description: The fee quoted to the opportunity
 *               batchTiming:
 *                 type: string
 *                 description: The timing of the batch
 *               leadStatus:
 *                 type: string
 *                 description: The current status of the opportunity
 *               stack:
 *                 type: string
 *                 description: The technology stack of the opportunity
 *               ClassMode:
 *                 type: string
 *                 description: The class mode selected by the opportunity (e.g., online, offline)
 *               opportunityStatus:
 *                 type: string
 *                 description: The status of the opportunity
 *               opportunitySatge:
 *                 type: string
 *                 description: The stage of the opportunity (e.g., initial, negotiation)
 *               DemoAttendedStage:
 *                 type: string
 *                 description: The demo attendance stage of the opportunity
 *               visitedStage:
 *                 type: string
 *                 description: The visited stage of the opportunity
 *               lostOpportunityReason:
 *                 type: string
 *                 description: The reason for losing the opportunity (if applicable)
 *               nextFollowUp:
 *                 type: string
 *                 description: The date of the next follow-up for the opportunity
 *               leadSource:
 *                 type: string
 *                 description: The source from which the opportunity came
 *               course:
 *                 type: string
 *                 description: The course the opportunity is interested in
 *               description:
 *                 type: string
 *                 description: Additional description or comments on the opportunity
 *             required:
 *               - name
 *               - cc
 *               - phone
 *               - email
 *               - feeQuoted
 *               - batchTiming
 *               - leadStatus
 *               - stack
 *               - ClassMode
 *               - opportunityStatus
 *               - opportunitySatge
 *               - DemoAttendedStage
 *               - visitedStage
 *               - lostOpportunityReason
 *               - nextFollowUp
 *               - leadSource
 *               - course
 *               - description
 *     responses:
 *       200:
 *         description: Opportunity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the opportunity
 *                 name:
 *                   type: string
 *                   description: The name of the opportunity
 *                 cc:
 *                   type: string
 *                   description: The country code of the opportunity's phone number
 *                 phone:
 *                   type: string
 *                   description: The phone number of the opportunity
 *                 email:
 *                   type: string
 *                   description: The email of the opportunity
 *                 feeQuoted:
 *                   type: number
 *                   format: float
 *                   description: The fee quoted to the opportunity
 *                 batchTiming:
 *                   type: string
 *                   description: The timing of the batch
 *                 leadStatus:
 *                   type: string
 *                   description: The current status of the opportunity
 *                 stack:
 *                   type: string
 *                   description: The technology stack of the opportunity
 *                 ClassMode:
 *                   type: string
 *                   description: The class mode selected by the opportunity (e.g., online, offline)
 *                 opportunityStatus:
 *                   type: string
 *                   description: The status of the opportunity
 *                 opportunitySatge:
 *                   type: string
 *                   description: The stage of the opportunity
 *                 DemoAttendedStage:
 *                   type: string
 *                   description: The demo attendance stage of the opportunity
 *                 visitedStage:
 *                   type: string
 *                   description: The visited stage of the opportunity
 *                 lostOpportunityReason:
 *                   type: string
 *                   description: The reason for losing the opportunity (if applicable)
 *                 nextFollowUp:
 *                   type: string
 *                   description: The date of the next follow-up for the opportunity
 *                 leadSource:
 *                   type: string
 *                   description: The source from which the opportunity came
 *                 course:
 *                   type: string
 *                   description: The course the opportunity is interested in
 *                 description:
 *                   type: string
 *                   description: Additional description or comments on the opportunity
 *       404:
 *         description: Opportunity not found
 *       400:
 *         description: Bad request, possibly due to invalid input
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/opportunity/{id}:
 *   patch:
 *     summary: Partially update an Opportunity by ID
 *     description: Apply partial updates to a single Opportunity in the database by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the opportunity to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the opportunity
 *               cc:
 *                 type: string
 *                 description: The country code of the opportunity's phone number
 *               phone:
 *                 type: string
 *                 description: The phone number of the opportunity
 *               email:
 *                 type: string
 *                 description: The email of the opportunity
 *               feeQuoted:
 *                 type: number
 *                 format: float
 *                 description: The fee quoted to the opportunity
 *               batchTiming:
 *                 type: string
 *                 description: The timing of the batch
 *               leadStatus:
 *                 type: string
 *                 description: The current status of the opportunity
 *               stack:
 *                 type: string
 *                 description: The technology stack of the opportunity
 *               ClassMode:
 *                 type: string
 *                 description: The class mode selected by the opportunity (e.g., online, offline)
 *               opportunityStatus:
 *                 type: string
 *                 description: The status of the opportunity
 *               opportunitySatge:
 *                 type: string
 *                 description: The stage of the opportunity (e.g., initial, negotiation)
 *               DemoAttendedStage:
 *                 type: string
 *                 description: The demo attendance stage of the opportunity
 *               visitedStage:
 *                 type: string
 *                 description: The visited stage of the opportunity
 *               lostOpportunityReason:
 *                 type: string
 *                 description: The reason for losing the opportunity (if applicable)
 *               nextFollowUp:
 *                 type: string
 *                 description: The date of the next follow-up for the opportunity
 *               leadSource:
 *                 type: string
 *                 description: The source from which the opportunity came
 *               course:
 *                 type: string
 *                 description: The course the opportunity is interested in
 *               description:
 *                 type: string
 *                 description: Additional description or comments on the opportunity
 *             example:
 *               name: "Updated Opportunity Name"
 *               email: "updated.email@example.com"
 *               phone: "+1234567890"
 *               feeQuoted: 1500.00
 *               batchTiming: "Evening"
 *               leadStatus: "Updated Status"
 *               stack: "Updated Stack"
 *               ClassMode: "Online"
 *               opportunityStatus: "In Progress"
 *               opportunitySatge: "Negotiation"
 *               DemoAttendedStage: "Yes"
 *               visitedStage: "Visited"
 *               lostOpportunityReason: "N/A"
 *               nextFollowUp: "2024-09-20"
 *               leadSource: "Referral"
 *               course: "Advanced Course"
 *               description: "Updated description"
 *     responses:
 *       200:
 *         description: Opportunity partially updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the opportunity
 *                 name:
 *                   type: string
 *                   description: The name of the opportunity
 *                 cc:
 *                   type: string
 *                   description: The country code of the opportunity's phone number
 *                 phone:
 *                   type: string
 *                   description: The phone number of the opportunity
 *                 email:
 *                   type: string
 *                   description: The email of the opportunity
 *                 feeQuoted:
 *                   type: number
 *                   format: float
 *                   description: The fee quoted to the opportunity
 *                 batchTiming:
 *                   type: string
 *                   description: The timing of the batch
 *                 leadStatus:
 *                   type: string
 *                   description: The current status of the opportunity
 *                 stack:
 *                   type: string
 *                   description: The technology stack of the opportunity
 *                 ClassMode:
 *                   type: string
 *                   description: The class mode selected by the opportunity
 *                 opportunityStatus:
 *                   type: string
 *                   description: The status of the opportunity
 *                 opportunitySatge:
 *                   type: string
 *                   description: The stage of the opportunity
 *                 DemoAttendedStage:
 *                   type: string
 *                   description: The demo attendance stage of the opportunity
 *                 visitedStage:
 *                   type: string
 *                   description: The visited stage of the opportunity
 *                 lostOpportunityReason:
 *                   type: string
 *                   description: The reason for losing the opportunity (if applicable)
 *                 nextFollowUp:
 *                   type: string
 *                   description: The date of the next follow-up for the opportunity
 *                 leadSource:
 *                   type: string
 *                   description: The source from which the opportunity came
 *                 course:
 *                   type: string
 *                   description: The course the opportunity is interested in
 *                 description:
 *                   type: string
 *                   description: Additional description or comments on the opportunity
 *       404:
 *         description: Opportunity not found
 *       400:
 *         description: Bad request, possibly due to invalid input
 *       500:
 *         description: Internal server error
 */

router.get("/", opportunityDetail.getOpportunity);
router.post("/", opportunityDetail.createOpport);
router.delete("/:id", opportunityDetail.delete);
router.put("/:id", opportunityDetail.updateOpportunity);
router.patch("/:id", opportunityDetail.PartialUpdateOpportunity);
module.exports = router;
