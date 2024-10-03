import { DataTypes } from "sequelize";


export const createOpportunityModel = (sequelize) => {
  return sequelize.define('opportunity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feequoted: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    batchtiming: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leadstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classmode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opportunitystatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opportunitystage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    demoattendedstage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitedstage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lostopportunityreason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nextfollowup: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    leadsource: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'opportunity', // Explicitly specify the table name
    freezeTableName: true,    // Prevent Sequelize from pluralizing the table name
  });
};
