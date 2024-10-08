const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Your API Documentation",
    version: "1.0.0",
    description: "A description of your API",
  },
  servers: [
    {
      url: "http://localhost:4000", // Replace with your server URL
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./router/user.router.js",
    "./router/leads.router.js",
    "./router/leadstatus.router.js",
    "./router/opportunity.router.js",
    "./router/learner.router.js",
    "./router/course.router.js",
  ], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
