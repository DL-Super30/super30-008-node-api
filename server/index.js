import express from 'express';
import { connection } from './postgres/postgres.js';
import router from './view/routes.js';


import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';



const app=express();
const PORT=8000;

app.use(cors());

app.use(express.json())

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User Management API',
    version: '1.0.0',
    description: 'API documentation for user management',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`, // Update with your server URL
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [
    './controller/userController.js',
    './controller/leadController.js',
    './controller/opportunityController.js', 
    './controller/learnerController.js', 

    './view/userRoutes.js',
    './view/leadRoutes.js',
    './view/opportunityRoutes.js',
    './view/learnerRoutes.js'
    
  ],
    
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//  existing routes
app.use(router);
app.listen(PORT,()=>{
   console.log(`server is running at post ${PORT}`) ;
   console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
})
connection();