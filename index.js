const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");  // Import cors
const { Sequelize } = require("sequelize");
const createUserModel = require("./model/userSchema");
const createLeadModel = require("./model/leadsSchema");
const createOpportunityModel = require("./model/opportunitySchema");
const createLearnerModel = require("./model/learnerSchema");
const courseModel = require("./model/courseSchema");
const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");

// Initialize Sequelize
const sequelize = new Sequelize("User", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
});

// Enable CORS for all origins
app.use(cors());  // This allows all origins to access your API

// Body Parser middleware
app.use(bodyParser.json());

let UserModel;
let LeadModel;
let OpporModel;
let LearnerModel;
<<<<<<< HEAD
let CourseModel;
=======

// Database connection function
>>>>>>> 592649378e9d04f231f975bcf90ad5b5550db587
const connection = async () => {
  try {
    await sequelize.authenticate();
    UserModel = await createUserModel(sequelize);
    LeadModel = await createLeadModel(sequelize);
    OpporModel = await createOpportunityModel(sequelize);
    LearnerModel = await createLearnerModel(sequelize);
    CourseModel = await courseModel(sequelize);
    await sequelize.sync();
    console.log("Database is synced");
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Middleware to ensure models are available
app.use(async (req, res, next) => {
<<<<<<< HEAD
  if (!UserModel || !LeadModel || !OpporModel || !CourseModel) {
=======
  if (!UserModel || !LeadModel || !OpporModel || !LearnerModel) {
>>>>>>> 592649378e9d04f231f975bcf90ad5b5550db587
    await connection();
  }
  req.UserModel = UserModel;
  req.LeadModel = LeadModel;
  req.OpporModel = OpporModel;
  req.LearnerModel = LearnerModel;
  req.CourseModel = CourseModel;
  next();
});

// Routers
const userRouter = require("./router/user.router");
const leadRouter = require("./router/leads.router");
const leadStatusRouter = require("./router/leadstatus.router");
const OpportunityRouter = require("./router/opportunity.router");
const LearnerRouter = require("./router/learner.router");
<<<<<<< HEAD
const CourseRouter = require("./router/course.router");
=======

>>>>>>> 592649378e9d04f231f975bcf90ad5b5550db587
app.use("/api/users", userRouter);
app.use("/api/leads", leadRouter);
app.use("/api/leadstatus", leadStatusRouter);
app.use("/api/opportunity", OpportunityRouter);
app.use("/api/learner", LearnerRouter);
<<<<<<< HEAD
app.use("/api/course", CourseRouter);
=======

>>>>>>> 592649378e9d04f231f975bcf90ad5b5550db587
// Serve Swagger documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(4000, function () {
  console.log("Server is running on port 4000");
  console.log("Swagger docs available at http://localhost:4000/api-docs");
});

module.exports = { UserModel, LeadModel };
