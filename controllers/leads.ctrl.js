const { Op, Sequelize } = require("sequelize");

const leadDetail = {
  getLeads: async (req, res) => {
    try {
      // Fetch all leads without pagination
      const leads = await req.LeadModel.findAll({
        order: [["createdAt", "DESC"]], // Sort by created date
      });
  
      // Send the full dataset to the frontend
      res.status(200).send({
        data: leads,
        meta: {
          totalLeads: leads.length, // Total number of leads
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
        leadname,
        phone,
        email,
        feeQuoted,
        batchTiming,
        leadStatus,
        leadSource,
        course,
        selectedClassMode,
      });
      res.status(201).send({
        status: "Lead successfully created",
        data: newLead,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).send({
          status: "Error",
          error: "Invalid input data",
          details: error.errors,
        });
      } else {
        console.error("Error creating lead:", error);
        res.status(500).send({
          status: "Error",
          error: "An error occurred during lead creation",
        });
      }
    }
  },

  getAll: async (req, res) => {
    const leadStatus = req.params.leadStatus;
    try {
      const leads = await req.LeadModel.findAll({
        where: { leadStatus },
      });
      res.status(200).send({ data: leads });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).send({ error: "Failed to fetch leads" });
    }
  },

  delete: async (req, res) => {
    const leadId = req.params.leadId;
    try {
      const lead = await req.LeadModel.findByPk(leadId);
      if (!lead) {
        return res.status(404).send({
          status: "Lead not found",
        });
      }
      await lead.destroy();
      res.status(200).send({
        message: "Lead deleted successfully",
        data: lead,
      });
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).send({ error: "Failed to delete lead" });
    }
  },

  updateLead: async (req, res) => {
    const leadId = req.params.leadId;
    const updateData = req.body;
    try {
      const lead = await req.LeadModel.findByPk(leadId);
      if (!lead) {
        return res.status(404).send({
          status: "Error",
          message: "Lead not found",
        });
      }
      const updatedLead = await lead.update(updateData);
      res.status(200).send({
        status: "Success",
        message: "Lead Updated Successfully",
        data: updatedLead,
      });
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).send({
        status: "Error",
        message: "Error occurred while updating the lead in database",
      });
    }
  },

  PartialUpdateLead: async (req, res) => {
    const leadId = req.params.leadId;
    try {
      const lead = await req.LeadModel.findByPk(leadId);
      if (!lead) {
        return res.status(404).send({
          error: "Not Found",
          errorDescription: "Lead is not available with the given leadId",
        });
      }
      await lead.update(req.body);
      res.status(200).send({ result: "Partial update of lead is successful" });
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).send({
        status: "Error",
        message: "Error occurred while updating the lead in database",
        error: error.message,
      });
    }
  },

  getLeadCount: async (req, res) => {
    try {
      if (!req.LeadModel || typeof req.LeadModel.findAll !== "function") {
        return res.status(400).send({
          status: "Error",
          message: "Invalid LeadModel provided",
        });
      }

      const leadCounts = await req.LeadModel.findAll({
        attributes: [
          "leadStatus",
          [Sequelize.fn("COUNT", Sequelize.col("id")), "leadCount"],
        ],
        group: ["leadStatus"],
      });

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

  getTodayLeads: async (req, res) => {
    try {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const todayLeads = await req.LeadModel.count({
        where: {
          createdAt: {
            [Op.gte]: startOfToday,
            [Op.lt]: endOfToday,
          },
        },
      });
      res.status(200).send({
        status: "Success",
        message: "Today's Lead count",
        data: todayLeads,
      });
    } catch (error) {
      console.error("Error fetching today's leads:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while fetching today's lead count",
      });
    }
  },

  getLeadCountByHour: async (req, res) => {
    try {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const leadCountByHour = await req.LeadModel.findAll({
        attributes: [
          [Sequelize.fn("DATE_TRUNC", "hour", Sequelize.col("createdAt")), "hour"],
          [Sequelize.fn("COUNT", Sequelize.col("id")), "leadCount"],
        ],
        where: {
          createdAt: {
            [Op.gte]: startOfToday,
            [Op.lt]: endOfToday,
          },
        },
        group: [Sequelize.fn("DATE_TRUNC", "hour", Sequelize.col("createdAt"))],
        order: [[Sequelize.fn("DATE_TRUNC", "hour", Sequelize.col("createdAt")), "ASC"]],
      });

      res.status(200).send({
        status: "Success",
        message: "Counts of leads on hourly basis",
        data: leadCountByHour,
      });
    } catch (error) {
      console.error("Error fetching lead counts by hour:", error);
      res.status(500).send({
        status: "Error",
        message: "An error occurred while fetching lead counts by hour",
      });
    }
  },

  convertLead: async (req, res) => {
    const leadId = req.params.leadId;
    const { convertTo } = req.body;

    try {
      const lead = await req.LeadModel.findByPk(leadId);
      if (!lead) {
        return res.status(404).send({
          status: "Error",
          message: "Lead not found",
        });
      }

      let convertedEntity;

      if (convertTo === 'learner') {
        if (!lead.leadname || !lead.phone || !lead.email) {
          return res.status(400).send({
            status: "Error",
            message: "Missing essential lead information for learner conversion",
          });
        }

        const parseCourse = (course) => {
          const courseId = parseInt(course, 10);
          return isNaN(courseId) ? null : courseId;
        };

        convertedEntity = await req.LearnerModel.create({
          firstname: lead.leadname.split(' ')[0],
          lastname: lead.leadname.split(' ').slice(1).join(' ') || '',
          phone: lead.phone,
          email: lead.email,
          registeredDate: new Date(),
          source: lead.leadSource || 'Unknown',
          registeredCourse: parseCourse(lead.course),
          modeOfClass: lead.selectedClassMode || null,
          batchTiming: lead.batchTiming || null,
          leadCreatedDate: lead.createdAt,
          description: lead.description || '',
          learnerStage: 'New',
          nextFollowUp: new Date(),
          techStack: lead.course || null,
        });

      } else if (convertTo === 'opportunity') {
        if (!lead.leadname || !lead.phone || !lead.email) {
          return res.status(400).send({
            status: "Error",
            message: "Missing essential lead information for opportunity conversion",
          });
        }

        convertedEntity = await req.OpporModel.create({
          name: lead.leadname,
          cc: lead.cc || '',
          phone: lead.phone,
          email: lead.email,
          feeQuoted: lead.feeQuoted || 0,
          batchTiming: lead.batchTiming || 'Not Assigned',
          leadStatus: lead.leadStatus || 'Unassigned',
          stack: lead.stack || 'General',
          ClassMode: lead.selectedClassMode || 'Online',
          opportunityStatus: 'New',
          opportunitySatge: 'Initial Contact',
          DemoAttendedStage: '',
          visitedStage: '',
          lostOpportunityReason: '',
          nextFollowUp: new Date(),
          leadSource: lead.leadSource || 'Unknown',
          course: lead.course || 'Not Assigned',
          description: '',
        });

      } else {
        return res.status(400).send({
          status: "Error",
          message: "Invalid conversion type. Use 'opportunity' or 'learner'.",
        });
      }

      await lead.destroy();

      res.status(200).send({
        status: "Success",
        message: `Lead converted to ${convertTo} successfully`,
        data: convertedEntity,
      });

    } catch (error) {
      console.error(`Error converting lead to ${convertTo}:`, error);
      res.status(500).send({
        status: "Error",
        message: `An error occurred while converting the lead to ${convertTo}`,
        error: error.message,
      });
    }
  },
};

module.exports = leadDetail;