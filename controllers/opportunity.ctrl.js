const { Op, Sequelize } = require("sequelize");
const opportunityDetail = {
  getOpportunity: async (req, res) => {
    try {
      // Get page and limit from the request query, set defaults if not provided
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 leads per page

      // Calculate the offset
      const offset = (page - 1) * limit;

      // Fetch leads with pagination
      const { rows: opportunity, count: totalOpport } =
        await req.OpporModel.findAndCountAll({
          offset,
          limit,
          // order: [["createdAt", "DESC"]], // Sort by created date
          /* attributes: {
            exclude: ["email", "phone"], // Exclude fields from the response
          }, */
        });
      // const { cc, ...responseData } = opportunity.toJSON();
      // Send the paginated response
      res.send({
        data: opportunity,
        meta: {
          totalOpport,
          totalPages: Math.ceil(totalOpport / limit),
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
  createOpport: async (req, res) => {
    let {
      name,
      cc,
      phone,
      email,
      feeQuoted,
      batchTiming,
      leadStatus,
      stack,
      ClassMode,
      opportunityStatus,
      opportunitySatge,
      DemoAttendedStage,
      visitedStage,
      lostOpportunityReason,
      nextFollowUp,
      leadSource,
      course,
      description,
    } = req.body;
    try {
      phone = cc + phone;
      const newOpport = await req.OpporModel.create({
        name: name,
        phone: phone,
        email: email,
        feeQuoted: feeQuoted,
        batchTiming: batchTiming,
        leadStatus: leadStatus,
        stack: stack,
        ClassMode: ClassMode,
        opportunityStatus: opportunityStatus,
        opportunitySatge: opportunitySatge,
        DemoAttendedStage: DemoAttendedStage,
        visitedStage: visitedStage,
        lostOpportunityReason: lostOpportunityReason,
        nextFollowUp: nextFollowUp,
        leadSource: leadSource,
        course: course,
        description: description,
      });
      if (newOpport) {
        res.status(200);
        res.send({
          status: "Opportunity successfully created",
          data: newOpport,
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
  /* getAll: async (req, res) => {
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
  }, */
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const Opportunity = await req.OpporModel.findByPk(id);
      if (!Opportunity) {
        res.status(404);
        res.send({
          status: "Opportunity not found ",
          error: error,
        });
      } else {
        const deletedOpport = Opport;
        await Opportunity.destroy();
        res.status(200);
        res.send({
          message: "user deleted !",
          data: deletedOpport,
        });
      }
    } catch (error) {
      res.status(500);
      res.send({ error });
    }
  },
  updateOpportunity: async (req, res) => {
    const id = req.params.id;
    let {
      name,
      cc,
      phone,
      email,
      feeQuoted,
      batchTiming,
      leadStatus,
      stack,
      ClassMode,
      opportunityStatus,
      opportunitySatge,
      DemoAttendedStage,
      visitedStage,
      lostOpportunityReason,
      nextFollowUp,
      leadSource,
      course,
      description,
    } = req.body;
    try {
      const opportunity = await req.OpporModel.findByPk(id);
      phone = cc + phone;
      const updatedOpport = await opportunity.update({
        name: name,
        phone: phone,
        email: email,
        feeQuoted: feeQuoted,
        batchTiming: batchTiming,
        leadStatus: leadStatus,
        stack: stack,
        ClassMode: ClassMode,
        opportunityStatus: opportunityStatus,
        opportunitySatge: opportunitySatge,
        DemoAttendedStage: DemoAttendedStage,
        visitedStage: visitedStage,
        lostOpportunityReason: lostOpportunityReason,
        nextFollowUp: nextFollowUp,
        leadSource: leadSource,
        course: course,
        description: description,
      });
      res.status(200);
      res.send({
        status: "Success",
        message: "Opportunity Updated Successfully ",
        data: updatedOpport,
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
    console.log("what is the type of " + typeof req.OpporModel);
    const id = req.params.id;
    try {
      const opportunity = await req.OpporModel.findByPk(id);
      if (opportunity) {
        for (let key in req.body) {
          //console.log(req.body[key]);
          console.log(req.body[key]);
          opportunity[key] = req.body[key];
        }
        res.status(200);
        res.send({ result: " Partial update of opportunity is done" });
      } else {
        res.status(404);
        res.send({
          error: "Not Found",
          errorDescription: "Lead is not available in API with the given Id",
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
};

module.exports = opportunityDetail;
