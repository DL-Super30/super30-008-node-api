const learnerDetail = {
  getlearner: async (req, res) => {
    try {
      // Fetch all learners without pagination
      const learner = await req.LearnerModel.findAll({
        // order: [["createdAt", "DESC"]], // Sort by created date
        /* attributes: {
            exclude: ["email", "phone"], // Exclude fields from the response if needed
          }, */
      });
  
      // Send the full dataset to the frontend
      res.send({
        data: learner,
        meta: {
          totalLearner: learner.length,  // Total number of learners
        },
      });
    } catch (error) {
      console.error("Error fetching learner:", error);
      res.status(500).send({ error: "Failed to fetch learner" });
    }
  },
  createLearner: async (req, res) => {
    let {
      firstname,
      lastname,
      idProof,
      phone,
      DOB,
      email,
      registeredDate,
      location,
      batchId,
      alternatePhone,
      description,
      exchangeRate,
      source,
      attendedDemo,
      learnerOwner,
      learnerStage,
      currency,
      leadCreatedDate,
      CounselingDoneBy,
      registeredCourse,
      techStack,
      courseComments,
      slackAccess,
      lMSAccess,
      preferableTime,
      batchTiming,
      modeOfClass,
      Comment,
    } = req.body;
    try {
      const newLearner = await req.LearnerModel.create({
        firstname: firstname,
        lastname: lastname,
        idProof: idProof,
        phone: phone,
        DOB: DOB,
        email: email,
        registeredDate: registeredDate,
        location: location,
        batchId: batchId,
        alternatePhone: alternatePhone,
        description: description,
        exchangeRate: exchangeRate,
        source: source,
        attendedDemo: attendedDemo,
        learnerOwner: learnerOwner,
        learnerStage: learnerStage,
        currency: currency,
        leadCreatedDate: leadCreatedDate,
        CounselingDoneBy: CounselingDoneBy,
        registeredCourse: registeredCourse,
        techStack: techStack,
        courseComments: courseComments,
        slackAccess: slackAccess,
        lMSAccess: lMSAccess,
        preferableTime: preferableTime,
        batchTiming: batchTiming,
        modeOfClass: modeOfClass,
        Comment: Comment,
      });
      if (newLearner) {
        res.status(200);
        res.send({
          status: "learner successfully created",
          data: newLearner,
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
      const learner = await req.LearnerModel.findByPk(id);
      if (!learner) {
        res.status(404);
        res.send({
          status: "learner not found ",
          error: error,
        });
      } else {
        const deletedLearner = learner;
        await learner.destroy();
        res.status(200);
        res.send({
          message: "user deleted !",
          data: deletedLearner,
        });
      }
    } catch (error) {
      res.status(500);
      res.send({ error });
    }
  },
  updatelearner: async (req, res) => {
    const id = req.params.id;
    let {
      firstname,
      lastname,
      idProof,
      phone,
      DOB,
      email,
      registeredDate,
      location,
      batchId,
      alternatePhone,
      description,
      exchangeRate,
      source,
      attendedDemo,
      learnerOwner,
      learnerStage,
      currency,
      leadCreatedDate,
      CounselingDoneBy,
      registeredCourse,
      techStack,
      courseComments,
      slackAccess,
      lMSAccess,
      preferableTime,
      batchTiming,
      modeOfClass,
      Comment,
    } = req.body;
    try {
      const learner = await req.LearnerModel.findByPk(id);
      //phone = cc + phone;
      const updatedLearner = await learner.update({
        firstname: firstname,
        lastname: lastname,
        idProof: idProof,
        phone: phone,
        DOB: DOB,
        email: email,
        registeredDate: registeredDate,
        location: location,
        batchId: batchId,
        alternatePhone: alternatePhone,
        description: description,
        exchangeRate: exchangeRate,
        source: source,
        attendedDemo: attendedDemo,
        learnerOwner: learnerOwner,
        learnerStage: learnerStage,
        currency: currency,
        leadCreatedDate: leadCreatedDate,
        CounselingDoneBy: CounselingDoneBy,
        registeredCourse: registeredCourse,
        techStack: techStack,
        courseComments: courseComments,
        slackAccess: slackAccess,
        lMSAccess: lMSAccess,
        preferableTime: preferableTime,
        batchTiming: batchTiming,
        modeOfClass: modeOfClass,
        Comment: Comment,
      });
      res.status(200);
      res.send({
        status: "Success",
        message: "learner Updated Successfully ",
        data: updatedLearner,
      });
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
  PartialUpdateLearner: async (req, res) => {
    //console.log("what is the type of " + typeof req.OpporModel);
    const id = req.params.id;
    try {
      const learner = await req.LearnerModel.findByPk(id);
      if (learner) {
        for (let key in req.body) {
          //console.log(req.body[key]);
          console.log(req.body[key]);
          learner[key] = req.body[key];
        }
        res.status(200);
        res.send({ result: " Partial update of learner is done" });
      } else {
        res.status(404);
        res.send({
          error: "Not Found",
          errorDescription: "Learner is not available in API with the given Id",
        });
      }
      await learner.save();
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

module.exports = learnerDetail;
