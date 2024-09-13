const leadDetail = {
  getLeads: async (req, res) => {
    try {
      // Get page and limit from the request query, set defaults if not provided
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 leads per page

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
      res.send({
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
      res.status(500);
      res.send({ error: "Failed to fetch leads" });
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
      phone = "+91" + phone;
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
      let count = await req.LeadModel.count({
        where: {
          leadStatus: leadStatus, // This will benefit from the leadStatus index
        },
      });
      res.status(200);
      res.send({
        data: leads,
        totalcount: count,
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
      phone = "+91" + phone;
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
          console.log(req.body[key]);
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
  getNewLeadCount: async (req, res) => {
    try {
      // Ensure req.LeadModel is a valid Sequelize model
      if (!req.LeadModel || typeof req.LeadModel.count !== "function") {
        return res.status(400).send({
          status: "Error",
          message: "Invalid LeadModel provided",
        });
      }

      // Count the number of records with the leadStatus 'new'
      let count = await req.LeadModel.count({
        where: {
          leadStatus: "new", // This will benefit from the leadStatus index
        },
      });

      // Debugging: Log the count and the SQL query executed
      console.log("Count of new leads:", count);

      // Send the count in the response
      res.status(200).send({
        status: "success",
        message: "total new leads count ",
        newLead: count,
      });
    } catch (error) {
      console.error("Error fetching count:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while fetching the count",
      });
    }
  },
  getColdLeadCount: async (req, res) => {
    try {
      // Ensure req.LeadModel is a valid Sequelize model
      if (!req.LeadModel || typeof req.LeadModel.count !== "function") {
        return res.status(400).send({
          status: "Error",
          message: "Invalid LeadModel provided",
        });
      }

      // Count the number of records with the leadStatus 'new'
      let count = await req.LeadModel.count({
        where: {
          leadStatus: "Cold Lead", // This will benefit from the leadStatus index
        },
      });

      // Debugging: Log the count and the SQL query executed
      console.log("Count of Cold leads:", count);

      // Send the count in the response
      res.status(200).send({
        status: "success",
        message: "total Cold leads count ",
        coldLead: count,
      });
    } catch (error) {
      console.error("Error fetching count:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while fetching the count",
      });
    }
  },
  getWarmLeadCount: async (req, res) => {
    try {
      // Ensure req.LeadModel is a valid Sequelize model
      if (!req.LeadModel || typeof req.LeadModel.count !== "function") {
        return res.status(400).send({
          status: "Error",
          message: "Invalid LeadModel provided",
        });
      }

      // Count the number of records with the leadStatus 'new'
      let count = await req.LeadModel.count({
        where: {
          leadStatus: "Warm Lead", // This will benefit from the leadStatus index
        },
      });

      // Debugging: Log the count and the SQL query executed
      console.log("Count of Cold leads:", count);

      // Send the count in the response
      res.status(200).send({
        status: "success",
        message: "total Warm leads count ",
        warmLead: count,
      });
    } catch (error) {
      console.error("Error fetching count:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while fetching the count",
      });
    }
  },
  getRegistredLeadCount: async (req, res) => {
    try {
      // Ensure req.LeadModel is a valid Sequelize model
      if (!req.LeadModel || typeof req.LeadModel.count !== "function") {
        return res.status(400).send({
          status: "Error",
          message: "Invalid LeadModel provided",
        });
      }

      // Count the number of records with the leadStatus 'new'
      let count = await req.LeadModel.count({
        where: {
          leadStatus: "Registered", // This will benefit from the leadStatus index
        },
      });

      // Debugging: Log the count and the SQL query executed
      console.log("Count of Cold leads:", count);

      // Send the count in the response
      res.status(200).send({
        status: "success",
        message: "total Registered leads count ",
        registeredLead: count,
      });
    } catch (error) {
      console.error("Error fetching count:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while fetching the count",
      });
    }
  },
};

module.exports = leadDetail;
