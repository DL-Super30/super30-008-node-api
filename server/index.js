import express from 'express';
import { connection } from './postgres/postgres.js';
import router from './view/routes.js';
import cors from 'cors'

const app=express();
const PORT=8000;

app.use(cors());

app.use(express.json())
app.use(router);





app.listen(PORT,()=>{
   console.log(`server is running at post ${PORT}`) 
})
connection();