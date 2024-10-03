import { OpportunityModel } from "../postgres/postgres.js"


/**
 * @swagger
 * tags:
 *   name: Opportunities
 *   description: Opportunity management endpoints
 */

/**
 * @swagger
 * /api/Opportunity:
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
 *                     totalopportunity:
 *                       type: integer
 *                     totalpages:
 *                       type: integer
 *                     currentpage:
 *                       type: integer
 *                     perpage:
 *                       type: integer
 */

    const  getOpportunity = async (req, res) => {
      try {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const offset = (page - 1) * limit;
  
       
        const { rows: opportunity, count: totalOpportunity } =
          await OpportunityModel.findAndCountAll({
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
 * /api/addOpportunity:
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
 *               feequoted:
 *                 type: number
 *               leadstatus:
 *                 type: string
 *               batchtiming:
 *                 type: string
 *               stack:
 *                 type: string              
 *               Classmode:
 *                 type: string
 *               opportunitystatus:
 *                 type: string
 *               opportunitysatge:
 *                 type: string

 *               Demoattendedstage:
 *                 type: string

 *               visitedstage:
 *                 type: string

 *               lostopportunityreason:
 *                 type: string

 *               nextfollowup:
 *                 type: string

 *               leadsource:
 *                 type: string

 *               course:
 *                 type: string
 
 *               description:
 *                 type: string

 *     responses:
 *       200:
 *         description: Opportunity created successfully

 */

    const createOpportunity= async (req, res) => {
      const {
        name,
        phone,
        email,
        feequoted,
        batchtiming,
        leadstatus,
        stack,
        classmode,
        opportunitystatus,
        opportunitystage,
        demoattendedstage,
        visitedstage,
        lostopportunityreason,
        nextfollowup,
        leadsource,
        course,
        description,
      } = req.body;
      try {
        
        const newOpportunity = await OpportunityModel.create({
          name,
          phone,
          email,
          feequoted,
          batchtiming,
          leadstatus,
          stack,
          classmode,
          opportunitystatus,
          opportunitystage,
          demoattendedstage,
          visitedstage,
          lostopportunityreason,
          nextfollowup,
          leadsource,
          course,
          description,
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
 * /api/opportunity/{id}:
 *   put:
 *     summary: Update an existing opportunity
 *     description: Updates the details of an opportunity based on the given ID.
 *     tags:
 *       - Opportunities
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               cc:
 *                 type: string
 *                 example: "1234567890"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               feequoted:
 *                 type: number
 *                 example: 5000
 *               batchtiming:
 *                 type: string
 *                 example: "Evening"
 *               leadstatus:
 *                 type: string
 *                 example: "Open"
 *               stack:
 *                 type: string
 *                 example: "Web Development"
 *               Classmode:
 *                 type: string
 *                 example: "Online"
 *               opportunitystatus:
 *                 type: string
 *                 example: "Active"
 *               opportunitystage:
 *                 type: string
 *                 example: "Negotiation"
 *               Demoattendedstage:
 *                 type: string
 *                 example: "Yes"
 *               visitedstage:
 *                 type: string
 *                 example: "No"
 *               lostopportunityreason:
 *                 type: string
 *                 example: "Not Interested"
 *               nextfollowup:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-10"
 *               leadsource:
 *                 type: string
 *                 example: "Website"
 *               course:
 *                 type: string
 *                 example: "Node.js Development"
 *               description:
 *                 type: string
 *                 example: "This opportunity is for a Node.js course."
 *             required:
 *               - name
 *               - phone
 *               - email
 *               - feequoted
 *               - batchtiming
 *               - leadstatus
 *               - stack
 *               - Classmode
 *               - opportunitystatus
 *               - opportunitystage
 *               - Demoattendedstage
 *               - visitedstage
 *               - lostopportunityreason
 *               - nextfollowup
 *               - leadsource
 *               - course
 *               - description
 *     responses:
 *       '200':
 *         description: Opportunity updated successfully
 *        
 *       '404':
 *         description: Opportunity not found
 *        
 *       '500':
 *         description: Error occurred while updating the opportunity
 *        
 */


    const updateOpportunity = async (req, res) => {
        const {id }= req.params;
        let {
          name,
          cc,
          phone,
          email,
          feequoted,
          batchtiming,
          leadstatus,
          stack,
          Classmode,
          opportunitystatus,
          opportunitystage,
          Demoattendedstage,
          visitedstage,
          lostopportunityreason,
          nextfollowup,
          leadsource,
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
            feequoted: feequoted,
            batchtiming: batchtiming,
            leadstatus: leadstatus,
            stack: stack,
            Classmode: Classmode,
            opportunitystatus: opportunitystatus,
            opportunitystage: opportunitystage,
            Demoattendedstage: Demoattendedstage,
            visitedstage: visitedstage,
            lostopportunityreason: lostopportunityreason,
            nextfollowup: nextfollowup,
            leadsource: leadsource,
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
 * /api/opportunity/{id}:
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
 *        
 *                
 *       404:
 *         description: Opportunity not found
 *        
 *       500:
 *         description: Server error
 *        
 */

  
    const deleteOpportunity = async (req, res) => {
      const {id} = req.params;
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
            data:Opportunity,
          });
        }
      } catch (error) {
        console.error("Error details:", error.message || error.stack); 
        res.status(500);
        res.send({ error: error.message || "An error occurred while deleting the opportunity" });
      }
    };
 
 

  
 export {
    getOpportunity,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
 }