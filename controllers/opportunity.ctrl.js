const opportunityDetail = {
  getOpportunity: async (req, res) => {
    try {
      // Fetch all opportunities without pagination
      const opportunities = await req.OpporModel.findAll({
        // Uncomment the line below to sort by created date if needed
        // order: [["createdAt", "DESC"]],
        // Uncomment the attributes section if you want to exclude specific fields
        /* attributes: {
          exclude: ["email", "phone"], // Exclude fields from the response
        }, */
      });

      res.send({
        data: opportunities,
        meta: {
          totalOpport: opportunities.length, // Total number of opportunities
        },
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).send({ error: "Failed to fetch leads" });
    }
  },

  createOpport: async (req, res) => {
    const {
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
      // Date formatting function
      const formatDate = (date) => {
        if (!date) return null; // If no date provided
        const parsedDate = new Date(date); // Convert date string to Date object
        if (isNaN(parsedDate.getTime())) {
          throw new Error("Invalid date format");
        }
        return parsedDate.toISOString(); // Format date to ISO 8601 for PostgreSQL
      };

      const formattedNextFollowUp = formatDate(nextFollowUp);

      // Create the new Opportunity
      const newOpport = await req.OpporModel.create({
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
        nextFollowUp: formattedNextFollowUp,
        leadSource,
        course,
        description,
      });

      res.status(201).send({
        status: "Opportunity successfully created",
        data: newOpport,
      });
    } catch (error) {
      console.error("Error creating opportunity:", error);
      if (error.name === "SequelizeValidationError") {
        res.status(400).send({
          status: "Error",
          error: "Invalid email format",
        });
      } else if (error.message === "Invalid date format") {
        res.status(400).send({
          status: "Error",
          error: "Invalid date format for next follow-up",
        });
      } else {
        res.status(500).send({
          status: "Error",
          error: "An error occurred during registration",
        });
      }
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const opportunity = await req.OpporModel.findByPk(id);
      if (!opportunity) {
        return res.status(404).send({
          status: "Opportunity not found",
        });
      }

      await opportunity.destroy();
      res.status(200).send({
        message: "Opportunity deleted!",
        data: opportunity,
      });
    } catch (error) {
      console.error("Error deleting opportunity:", error);
      res.status(500).send({ error });
    }
  },

  updateOpportunity: async (req, res) => {
    const id = req.params.id;
    const {
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
      if (!opportunity) {
        return res.status(404).send({
          status: "Opportunity not found",
        });
      }

      // Update opportunity
      const updatedOpport = await opportunity.update({
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
      });

      res.status(200).send({
        status: "Success",
        message: "Opportunity updated successfully",
        data: updatedOpport,
      });
    } catch (error) {
      console.error("Error updating opportunity:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while updating the opportunity",
      });
    }
  },

  PartialUpdateOpportunity: async (req, res) => {
    const id = req.params.id;
    try {
      const opportunity = await req.OpporModel.findByPk(id);
      if (!opportunity) {
        return res.status(404).send({
          error: "Not Found",
          errorDescription: "Opportunity not found with the given ID",
        });
      }

      // Update only the fields provided in req.body
      Object.assign(opportunity, req.body);
      await opportunity.save();

      res.status(200).send({ result: "Partial update of opportunity is done" });
    } catch (error) {
      console.error("Error during partial update:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred during the partial update",
        error,
      });
    }
  },
  convertOpportunityToLearner: async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the opportunity by ID
      const opportunity = await req.OpporModel.findByPk(id);
  
      if (!opportunity) {
        return res.status(404).send({ error: "Opportunity not found" });
      }
  
      // Create a new learner using opportunity data
      const newLearner = await req.LearnerModel.create({
        firstname: opportunity.name.split(' ')[0] || '',
        lastname: opportunity.name.split(' ').slice(1).join(' ') || '',
        phone: opportunity.phone || '',
        email: opportunity.email || '',
        registeredDate: new Date(), // Use current date
        location: '',
        batchId: '',
        alternatePhone: '',
        description: opportunity.description || '',
        source: opportunity.leadSource || '',
        learnerOwner: '',
        learnerStage: 'New',
        leadCreatedDate: opportunity.createdAt || new Date(), // Fallback to current date if missing
        CounselingDoneBy: '',
        registeredCourse: opportunity.course || null, // Ensure it's an integer or null
        techStack: opportunity.stack || '',
        courseComments: '',
        slackAccess: '',
        lMSAccess: '',
        preferableTime: opportunity.batchTiming || '',
        batchTiming: opportunity.batchTiming || '',
        modeOfClass: opportunity.ClassMode || '',
        Comment: `Converted from opportunity. Fee Quoted: ${opportunity.feeQuoted || 'N/A'}`,
        createdAt: new Date(),
        nextFollowUp: opportunity.nextFollowUp || new Date(),
        updatedAt: new Date(),
      });
      
      
      
  
      // Optionally, you can check if the learner was successfully created before deleting the opportunity
      if (!newLearner) {
        return res.status(500).send({
          error: "Failed to create the learner from the opportunity"
        });
      }
  
      // Delete the opportunity after conversion
      await opportunity.destroy();
  
      // Send success response with created learner data
      res.status(200).send({
        message: "Opportunity converted to Learner successfully",
        data: newLearner,
      });
      
    } catch (error) {
      console.error("Error converting opportunity to learner:", error);
      res.status(500).send({
        error: "An error occurred during the conversion process",
      });
    }
  },
  
};

module.exports = opportunityDetail;
