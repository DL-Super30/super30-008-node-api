const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const createUserModel = require("./model/userSchema");
const createLeadModel = require("./model/leadsSchema");
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
const connection = async () => {
  try {
    await sequelize.authenticate();
    UserModel = await createUserModel(sequelize);
    LeadModel = await createLeadModel(sequelize);
    await sequelize.sync();
    console.log("database is synced ");
    console.log(UserModel);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.use(async (req, res, next) => {
  if (!UserModel || !LeadModel) {
    await connection();
  }
  req.UserModel = UserModel; // Attach UserModel to request
  req.LeadModel = LeadModel;
  next();
});

const userRouter = require("./router/user.router");
const leadRouter = require("./router/leads.router");
app.use("/users", userRouter);
app.use("/leads", leadRouter);
// Serve Swagger documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use("/api-docs-leads", swaggerUi.serve, swaggerUi.setup(swaggerSpec1));
app.listen(4000, function () {
  console.log("Server is running on port 4000");
  console.log("Swagger docs available at http://localhost:4000/api-docs");
});

module.exports = { UserModel, LeadModel };
