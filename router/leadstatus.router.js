const express = require("express");
const leadDetail = require("../controllers/leads.ctrl");

const router = express.Router();
/**
 * @swagger
 * /leadstatus/todayLeadsOnHourly:
 *   get:
 *     summary: total count of Leads
 *     description: Retrieve leads from the database
 *     responses:
 *       200:
 *         description: A list of  leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   totalLeads:
 *                     type: string
 */
/**
 * @swagger
 * /leadstatus/todayLeads:
 *   get:
 *     summary: total count of Today's Lead
 *     description: Retrieve leads from the database
 *     responses:
 *       200:
 *         description: A list of  leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   totalLeads:
 *                     type: string
 */
/**
 * @swagger
 * /leadstatus//getleadStatus:
 *   get:
 *     summary: total count of Today's Lead
 *     description: Retrieve leads from the database
 *     responses:
 *       200:
 *         description: A list of  leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   totalLeads:
 *                     type: string
 */
//router.get("/new", leadDetail.getNewLeadCount);
//router.get("/cold", leadDetail.getColdLeadCount);
//router.get("/warm", leadDetail.getWarmLeadCount);
//router.get("/registered", leadDetail.getRegistredLeadCount);
router.get("/todayLeadsOnHourly", leadDetail.getLeadCountByHour);
router.get("/todayLeads", leadDetail.getTodayLeads);
router.get("/getleadStatus", leadDetail.getLeadCount);

module.exports = router;
