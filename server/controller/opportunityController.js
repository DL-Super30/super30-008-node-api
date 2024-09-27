import { OpportunityModel } from "../postgres/postgres.js"


/**
 * @swagger
 * tags:
 *   name: Opportunities
 *   description: Opportunity management endpoints
 */

/**
 * @swagger
 * /api/opportunities:
 *   get:
 *     summary: Get a list of all opportunities
 *     tags: [Opportunities]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of opportunities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalOpportunity:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 */

    const  getOpportunity = async (req, res) => {
      try {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const offset = (page - 1) * limit;
  
       
        const { rows: opportunity, count: totalOpportunity } =
          await req.OpportunityModel.findAndCountAll({
            offset,
            limit,
            
          });
        
        res.status(200).send({
          data: opportunity,
          meta: {
            totalOpportunity,
            totalPages: Math.ceil(totalOpportunity / limit),
            currentPage: page,
            perPage: limit,
          },
        });
      } catch (error) {
        console.error("Error fetching leads:", error);
        res.status(500);
        res.send({ error: "Failed to fetch leads" });
      }
    };
     
    /**
 * @swagger
 * /api/opportunities:
 *   post:
 *     summary: Create a new opportunity
 *     tags: [Opportunities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               feeQuoted:
 *                 type: number
 *               leadStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Opportunity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 */

    const createOpportunity= async (req, res) => {
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
        
        const newOpportunity = await OpportunityModel.create({
          name: name,
          cc: cc,
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
       
          res.status(200).send({
            status: "Opportunity successfully created",
            data: newOpportunity,
          });
       
      } catch (error) {
        
        if (error.name === "SequelizeValidationError") {
          res.status(400).send({
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
        
        }
      }
    };

/**
 * @swagger
 * /api/opportunities/{id}:
 *   put:
 *     summary: Update an existing opportunity
 *     tags: [Opportunities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the opportunity to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the opportunity
 *               email:
 *                 type: string
 *                 description: Email address
 *               phone:
 *                 type: string
 *                 description: Contact number
 *               feeQuoted:
 *                 type: number
 *                 description: Fee quoted for the opportunity
 *               batchTiming:
 *                 type: string
 *                 description: Timing of the batch
 *               leadStatus:
 *                 type: string
 *                 description: Status of the lead
 *               stack:
 *                 type: string
 *                 description: Technology stack
 *               classMode:
 *                 type: string
 *                 description: Mode of class (Online/Offline)
 *     responses:
 *       200:
 *         description: Opportunity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 */


    const updateOpportunity = async (req, res) => {
        const {id }= req.params.id;
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
          const opportunity = await OpportunityModel.findByPk(id);
          
          const updatedOpportunity = await opportunity.update({
            name: name,
            cc: cc,
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
            data: updatedOpportunity,
          });
        } catch (error) {
          console.log(error);
          res.status(500);
          res.send({
            status: "Error",
            message: "error occured while updating the user in databse ",
          });
        }
      };

      /**
 * @swagger
 * /api/opportunities/{id}:
 *   delete:
 *     summary: Delete an opportunity
 *     tags: [Opportunities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the opportunity to delete
 *     responses:
 *       200:
 *         description: Opportunity deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Opportunity deleted successfully"
 *       404:
 *         description: Opportunity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Opportunity not found"
 *                 error:
 *                   type: string
 *                   example: "The specified opportunity does not exist"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while deleting the opportunity"
 */

  
    const deleteopportunity = async (req, res) => {
      const {id} = req.params.id;
      try {
        const Opportunity = await OpportunityModel.findByPk(id);
        if (!Opportunity) {
          res.status(404).send({
            status: "Opportunity not found ",
            error: error,
          });
        } else {
         
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
    };
 
 

  
 export {
    getOpportunity,
    createOpportunity,
    updateOpportunity,
    deleteopportunity,
 }