
import { LeadModel } from "../postgres/postgres.js";

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: API for managing leads
 */

/**
 * @swagger
 * /leads:
 *   get:
 *     summary: Retrieve a paginated list of leads
 *     tags: [Leads]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of leads per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of leads
 *       500:
 *         description: Failed to fetch leads
 */

const getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 15; 
    const offset = (page - 1) * limit;

    const { rows: leads, count: totalLeads } = await LeadModel.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).send({
      data: leads,
      meta: {
        totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send({ error: "Failed to fetch leads" });
  }
};


/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               leadSource:
 *                 type: string
 *               stack:
 *                 type: string
 *               course:
 *                 type: string
 *               feeQuoted:
 *                 type: number
 *               batchTiming:
 *                 type: string
 *               leadStatus:
 *                 type: string
 *               classMode:
 *                 type: string
 *               nextFollowUp:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lead successfully created
 *       400:
 *         description: Invalid data format
 *       500:
 *         description: Internal server error
 */

const createLead = async (req, res) => {
  const { name, phone, email, leadSource, stack, course, feeQuoted, batchTiming, leadStatus, classMode, nextFollowUp } = req.body;

  try {
    const newLead = await LeadModel.create({
      name,
      phone: "+91" + phone, 
      email,
      leadSource,
      stack,
      course,
      feeQuoted,
      batchTiming,
      leadStatus,
      classMode,
      nextFollowUp,
    });

    res.status(201).send({
      status: "Lead successfully created",
      data: newLead,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).send({
        status: "Error",
        error: "Invalid data format",
        details: error.errors,
      });
    } else {
      res.status(500).send({
        status: "Error",
        error: "Internal server error",
        details: error,
      });
      console.error("Error creating lead:", error);
    }
  }
};

/**
 * @swagger
 * /leads/status/{leadStatus}:
 *   get:
 *     summary: Retrieve leads by status
 *     tags: [Leads]
 *     parameters:
 *       - name: leadStatus
 *         in: path
 *         required: true
 *         description: The status of the leads to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of leads with the specified status
 *       500:
 *         description: Failed to fetch leads
 */

const getAllLeadsByStatus = async (req, res) => {
  const leadStatus = req.params.leadStatus;

  try {
    const leads = await LeadModel.findAll({
      where: { leadStatus },
    });

    res.status(200).send({
      status: "Success",
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send({ error: "Failed to fetch leads" });
  }
};

/**
 * @swagger
 * /leads/{id}:
 *   put:
 *     summary: Update an existing lead
 *     tags: [Leads]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the lead to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               leadSource:
 *                 type: string
 *               stack:
 *                 type: string
 *               course:
 *                 type: string
 *               feeQuoted:
 *                 type: number
 *               batchTiming:
 *                 type: string
 *               leadStatus:
 *                 type: string
 *               classMode:
 *                 type: string
 *               nextFollowUp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Failed to update lead
 */

const updateLead = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, leadSource, stack, course, feeQuoted, batchTiming, leadStatus, classMode, nextFollowUp } = req.body;

  try {
    const lead = await LeadModel.findByPk(id);
    if (!lead) {
      return res.status(404).send({ error: "Lead not found" });
    }

    await lead.update({
      name,
      phone: "+91" + phone,
      email,
      leadSource,
      stack,
      course,
      feeQuoted,
      batchTiming,
      leadStatus,
      classMode,
      nextFollowUp,
    });

    res.status(200).send({
      status: "Success",
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).send({
      error: "Failed to update lead",
    });
  }
};

/**
 * @swagger
 * /leads/{id}:
 *   delete:
 *     summary: Delete a lead
 *     tags: [Leads]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the lead to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Failed to delete lead
 */

const deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await LeadModel.findByPk(id);
    if (!lead) {
      return res.status(404).send({ error: "Lead not found" });
    }

    await lead.destroy();
    res.status(200).send({
      status: "Success",
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).send({
      error: "Failed to delete lead",
    });
  }
};

// Export all functions using ES6 export
export {
  createLead,
  getLeads as getAllLeads, // renamed function to match the route
  getAllLeadsByStatus,
  updateLead,
  deleteLead,
};
