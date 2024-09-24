// postgres.js
import { Sequelize } from "sequelize";
import { createUserModel } from "../model/userschema.js";
import { createLeadModel } from "../model/leadschema.js";

const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});

let UserModel = null;
let LeadModel = null;

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    UserModel = await createUserModel(sequelize);
    LeadModel = await createLeadModel(sequelize);

    await sequelize.sync();

    console.log("Database Sync");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Export using ES6 export
export {
  connection,
  UserModel,
  LeadModel,
};
