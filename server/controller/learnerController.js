import { LearnerModel } from "../postgres/postgres.js"

/**
 * @swagger
 * tags:
 *   name: Learners
 *   description: Endpoints for managing learners
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Learner:
 *       type: object
 *       required:
 *         - firstname
 *         - phone
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the learner.
 *         firstname:
 *           type: string
 *           description: The learner's first name.
 *         lastname:
 *           type: string
 *           description: The learner's last name.
 *         idProof:
 *           type: string
 *           description: ID proof document number.
 *         phone:
 *           type: string
 *           description: Phone number of the learner.
 *         DOB:
 *           type: string
 *           format: date
 *           description: Date of birth.
 *         email:
 *           type: string
 *           description: Email of the learner.
 *         registeredDate:
 *           type: string
 *           format: date
 *           description: Date when the learner registered.
 *         location:
 *           type: string
 *           description: Location of the learner.
 *         batchId:
 *           type: string
 *           description: Associated batch ID.
 *         alternatePhone:
 *           type: string
 *           description: Alternate phone number.
 *         description:
 *           type: string
 *           description: Additional description.
 *         source:
 *           type: string
 *           description: Lead source.
 *         attendedDemo:
 *           type: string
 *           description: If the learner attended a demo.
 *         learnerOwner:
 *           type: string
 *           description: The owner or point of contact for the learner.
 *         leadCreatedDate:
 *           type: string
 *           format: date
 *           description: Date when the lead was created.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Auto-generated field for when the record was created.
 *         nextFollowUp:
 *           type: string
 *           format: date-time
 *           description: The next follow-up date.
 */

/**
 * @swagger
 * /api/learner:
 *   get:
 *     summary: Get a list of learners
 *     tags: [Learners]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: The list of learners.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Learner'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalLearner:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 */
const getLearner = async (req, res) => {
      try {
        
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 15; // Default to 10 leads per page
  
        const offset = (page - 1) * limit;
  
        const { rows: learner, count: totalLearner } =
          await LearnerModel.findAndCountAll({
            offset,
            limit,
           
          });
     
        res.send({
          data: learner,
          meta: {
            totalLearner,
            totalPages: Math.ceil(totalLearner / limit),
            currentPage: page,
            perPage: limit,
          },
        });
      } catch (error) {
        console.error("Error fetching learner:", error);
        res.status(500);
        res.send({ error: "Failed to fetch learner" });
      }
    };

    /**
 * @swagger
 * /api/addLearner:
 *   post:
 *     summary: Create a new learner
 *     tags: [Learners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Learner'
 *     responses:
 *       201:
 *         description: Learner successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       400:
 *         description: Bad request, invalid data.
 */

   
   
    const createLearner = async (req, res) => {
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
        nextFollowUp
      } = req.body;
      try {
        const newLearner = await LearnerModel.create({
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
          nextFollowUp: nextFollowUp
        });
        if (newLearner) {
          res.status(200);
          res.send({
            status: "learner successfully created",
            data: newLearner,
          });
        }
      } catch (error) {
      
        if (error.name === "SequelizeValidationError") {
          res.status(400);
          res.send({
            status: "Error",
            error: "Invalid email format",
            error,
          });
        } else {
       
          res.status(500).send({
            status: "Error",
            error: "An error occurred during registration",
            error,
          });
          console.log(error);
        }
      }
    };

   /**
 * @swagger
 * /api/learner/{id}:
 *   delete:
 *     summary: Delete a learner by ID
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the learner to delete.
 *     responses:
 *       200:
 *         description: Learner deleted successfully.
 *       404:
 *         description: Learner not found.
 *       500:
 *         description: Error while deleting the learner.
 */
   const deleteLearner = async (req, res) => {
      const id = req.params.id;
      try {
        const learner = await LearnerModel.findByPk(id);
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
    };

    /**
 * @swagger
 * /api/learner/{id}:
 *   put:
 *     summary: Update a learner by ID
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the learner to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Learner'
 *     responses:
 *       200:
 *         description: Learner updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       404:
 *         description: Learner not found.
 *       500:
 *         description: Error while updating the learner.
 */


   const updateLearner = async (req, res) => {
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
        const learner = await LearnerModel.findByPk(id);
     
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
    };
    

    export {
        getLearner,
        createLearner,
        updateLearner,
        deleteLearner,
     }