const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const createUserModel = require("./model/userSchema");
const createLeadModel = require("./model/leadsSchema");
const createOpportunityModel = require("./model/opportunitySchema");
const createLearnerModel = require("./model/learnerSchema");
const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");

//const connection = require("./postgresdb/postgresConnection");
const sequelize = new Sequelize("User", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});
app.use(bodyParser.json());
let UserModel;
let LeadModel;
let OpporModel;
let LearnerModel;
const connection = async () => {
  try {
    await sequelize.authenticate();
    UserModel = await createUserModel(sequelize);
    LeadModel = await createLeadModel(sequelize);
    OpporModel = await createOpportunityModel(sequelize);
    LearnerModel = await createLearnerModel(sequelize);
    await sequelize.sync();
    console.log("database is synced ");
    //console.log(UserModel);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.use(async (req, res, next) => {
  if (!UserModel || !LeadModel || !OpporModel) {
    await connection();
  }
  req.UserModel = UserModel; // Attach UserModel to request
  req.LeadModel = LeadModel;
  req.OpporModel = OpporModel;
  req.LearnerModel = LearnerModel;
  next();
});

const userRouter = require("./router/user.router");
const leadRouter = require("./router/leads.router");
const leadStatusRouter = require("./router/leadstatus.router");
const OpportunityRouter = require("./router/opportunity.router");
const LearnerRouter = require("./router/learner.router");
app.use("/api/users", userRouter);
app.use("/api/leads", leadRouter);
app.use("/api/leadstatus", leadStatusRouter);
app.use("/api/opportunity", OpportunityRouter);
app.use("/api/learner", LearnerRouter);
// Serve Swagger documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use("/api-docs-leads", swaggerUi.serve, swaggerUi.setup(swaggerSpec1));
app.listen(4000, function () {
  console.log("Server is running on port 4000");
  console.log("Swagger docs available at http://localhost:4000/api-docs");
});

module.exports = { UserModel, LeadModel };
