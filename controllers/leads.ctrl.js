const { Op, Sequelize } = require("sequelize");
const leadDetail = {
  getLeads: async (req, res) => {
    try {
<<<<<<< HEAD
      // Get page and limit from the request query, set defaults if not provided
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 leads per page
      console.log(req.LeadModel);
      // Calculate the offset
      const offset = (page - 1) * limit;

      // Fetch leads with pagination
      const { rows: leads, count: totalLeads } =
        await req.LeadModel.findAndCountAll({
          offset,
          limit,
          order: [["createdAt", "DESC"]], // Sort by created date
          /* attributes: {
            exclude: ["email", "phone"], // Exclude fields from the response
          }, */
        });

      // Send the paginated response
=======
      // Get all leads without pagination
      const leads = await req.LeadModel.findAll({
        order: [["createdAt", "DESC"]], // Sort by created date
      });

      // Send all leads in the response
>>>>>>> 592649378e9d04f231f975bcf90ad5b5550db587
      res.send({
        data: leads,
        meta: {
          totalLeads: leads.length,
        },
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).send({ error: "Failed to fetch leads" });
    }
  },
  createLead: async (req, res) => {
    let {
      leadname,
      phone,
      email,
      feeQuoted,
      batchTiming,
      leadStatus,
      leadSource,
      course,
      selectedClassMode,
    } = req.body;
    try {
      phone = "+91 " + phone;
      const newLead = await req.LeadModel.create({
        leadname: leadname,
        phone: phone,
        email: email,
        feeQuoted: feeQuoted,
        batchTiming: batchTiming,
        leadStatus: leadStatus,
        leadSource: leadSource,
        course: course,
        selectedClassMode: selectedClassMode,
      });
      if (newLead) {
        res.status(201);
        res.send({
          status: "Lead successfully created",
          data: newLead,
        });
      }
    } catch (error) {
      //console.log("what is value inside error.name " + error.name);
      // Handle specific database errors
      if (error.name === "SequelizeValidationError") {
        res.status(400);
        res.send({
          status: "Error",
          error: "Invalid email format",
          error,
        });
      } else {
        // General error handling
        res.status(500).send({
          status: "Error",
          error: "An error occurred during registration",
          error,
        });
        console.log(error);
      }
    }
  },
  getAll: async (req, res) => {
    const leadStatus = req.params.leadSatus;
    try {
      let leads = await req.LeadModel.findAll({
        where: {
          leadStatus: leadStatus, // This will benefit from the leadStatus index
        },
      });
      res.status(200);
      res.send({
        data: leads,
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500);
      res.send({ error: "Failed to fetch leads" });
    }
  },
  delete: async (req, res) => {
    const leadId = req.params.leadId;
    try {
      const lead = await req.LeadModel.findByPk(leadId);
      if (!lead) {
        res.status(404);
        res.send({
          status: "lead not found ",
          error: error,
        });
      } else {
        const deletedLead = lead;
        await lead.destroy();
        res.status(200);
        res.send({
          message: "user deleted !",
          data: deletedLead,
        });
      }
    } catch (error) {
      res.status(500);
      res.send({ error });
    }
  },
  updateLead: async (req, res) => {
    const leadId = req.params.leadId;
    let {
      leadname,
      phone,
      email,
      feeQuoted,
      batchTiming,
      leadStatus,
      leadSource,
      course,
      selectedClassMode,
    } = req.body;
    try {
      const lead = await req.LeadModel.findByPk(leadId);
      phone =  phone;
      const updatedLead = await lead.update({
        leadname: leadname,
        phone: phone,
        email: email,
        feeQuoted: feeQuoted,
        batchTiming: batchTiming,
        leadStatus: leadStatus,
        leadSource: leadSource,
        course: course,
        selectedClassMode: selectedClassMode,
      });
      res.status(200);
      res.send({
        status: "Success",
        message: "Lead Updated Successfully ",
        data: updatedLead,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({
        status: "Error",
        message: "error occured while updating the user in databse ",
      });
    }
  },
  PartialUpdateLead: async (req, res) => {
    console.log("what is the type of " + typeof req.LeadModel);
    const leadId = req.params.leadId;
    try {
      const lead = await req.LeadModel.findByPk(leadId);
      if (lead) {
        for (let key in req.body) {
          //console.log(req.body[key]);
          // console.log(req.body[key]);
          lead[key] = req.body[key];
        }
        res.status(200);
        res.send({ result: " Partial update of lead is done" });
      } else {
        res.status(404);
        res.send({
          error: "Not Found",
          errorDescription:
            "Lead is not available in API with the given leadId",
        });
      }
      await lead.save();
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({
        status: "Error",
        message: "error occured while updating the user in databse ",
        error,
      });
    }
  },
  /* getLeadCount: async (req, res) => {
    try {
      // Ensure req.LeadModel is a valid Sequelize model
      if (!req.LeadModel || typeof req.LeadModel.count !== "function") {
        return res.status(400).send({
          status: "Error",
          message: "Invalid LeadModel provided",
        });
      }

      // Count the number of records with the leadStatus 'new'
      let count = await req.LeadModel.count();

      // Debugging: Log the count and the SQL query executed
      console.log("Count of Total leads:", count);

      // Send the count in the response
      res.status(200).send({
        status: "success",
        message: "total leads count ",
        TotalLead: count,
      });
    } catch (error) {
      console.error("Error fetching count:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while fetching the count",
      });
    }
  }, */
  getLeadCount: async (req, res) => {
    try {
      // Ensure req.LeadModel is a valid Sequelize model
      if (!req.LeadModel || typeof req.LeadModel.findAll !== "function") {
        return res.status(400).send({
          status: "Error",
          message: "Invalid LeadModel provided",
        });
      }

      // Fetch the count of leads grouped by leadStatus
      const leadCounts = await req.LeadModel.findAll({
        attributes: [
          "leadStatus", // Group by leadStatus
          [Sequelize.fn("COUNT", Sequelize.col("id")), "leadCount"], // Count the number of leads per status
        ],
        group: ["leadStatus"], // Group by leadStatus
      });

      // Debugging: Log the result and the SQL query executed
      console.log("Lead counts by status:", leadCounts);

      // Send the lead counts in the response
      res.status(200).send({
        status: "success",
        message: "Lead counts by status",
        data: leadCounts,
      });
    } catch (error) {
      console.error("Error fetching lead counts by status:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while fetching the lead counts by status",
      });
    }
  },

  // Function to get leads created today
  getTodayLeads: async (req, res) => {
    try {
      // Get the start and end of today
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0); // Set to midnight (start of day)

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999); // Set to the end of the day

      // Fetch leads created today
      const todayLeads = await req.LeadModel.count({
        where: {
          createdAt: {
            [Op.gte]: startOfToday, // createdAt is greater than or equal to start of today
            [Op.lt]: endOfToday, // createdAt is less than the end of today
          },
        },
      });
      res.status(200);
      res.send({
        status: "Success",
        message: "Today's Lead count",
        data: todayLeads,
      });
    } catch (error) {
      res.status(500);
      console.error("Error fetching today's leads:", error);
    }
  },
  getLeadCountByHour: async (req, res) => {
    try {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0); // Set to midnight (start of today)

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999); // Set to the end of today
      // Fetch the count of leads created in each hour
      const leadCountByHour = await req.LeadModel.findAll({
        attributes: [
          [
            Sequelize.fn("DATE_TRUNC", "hour", Sequelize.col("createdAt")),
            "hour",
          ], // Group by each hour
          [Sequelize.fn("COUNT", Sequelize.col("id")), "leadCount"], // Count the number of leads per hour
        ],
        where: {
          createdAt: {
            [Sequelize.Op.gte]: startOfToday, // createdAt is greater than or equal to start of today
            [Sequelize.Op.lt]: endOfToday, // createdAt is less than the end of today
          },
        },
        group: [Sequelize.fn("DATE_TRUNC", "hour", Sequelize.col("createdAt"))], // Grouping by truncated hour
        order: [
          [
            Sequelize.fn("DATE_TRUNC", "hour", Sequelize.col("createdAt")),
            "ASC",
          ],
        ], // Order by hour ascending
      });

      res.status(200);
      res.send({
        status: "Success",
        message: "counts of leads on hourly basis",
        data: leadCountByHour,
      });
    } catch (error) {
      console.error("Error fetching lead counts by hour:", error);
    }
  },
  convertToOpportunity: async (req, res) => {
    const leadId = req.params.leadId;
    try {
      // Find the lead
      const lead = await req.LeadModel.findByPk(leadId);
      if (!lead) {
        return res.status(404).send({
          status: "Error",
          message: "Lead not found",
        });
      }

      // Create a new opportunity from the lead data
      const newOpportunity = await req.OpporModel.create({
        name: lead.leadname,
        cc: lead.cc || '',
        phone: lead.phone,
        email: lead.email,
        feeQuoted: lead.feeQuoted,
        batchTiming: lead.batchTiming,
        leadStatus: lead.leadStatus,
        stack: lead.stack || '',
        ClassMode: lead.selectedClassMode,
        opportunityStatus: 'New',
        opportunitySatge: 'Initial Contact',
        DemoAttendedStage: '',
        visitedStage: '',
        lostOpportunityReason: '',
        nextFollowUp: new Date(),
        leadSource: lead.leadSource,
        course: lead.course,
        description: '',
      });

      // Delete the original lead
      await lead.destroy();

      res.status(200).send({
        status: "Success",
        message: "Lead converted to opportunity successfully",
        data: newOpportunity,
      });
    } catch (error) {
      console.error("Error converting lead to opportunity:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while converting the lead to an opportunity",
        error: error.message,
      });
    }
  }
};

module.exports = leadDetail;
