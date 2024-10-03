import { DataTypes } from "sequelize";


export const createLeadModel = (sequelize) => {
  return sequelize.define('lead', {
    id: {
      type: DataTypes.STRING,
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
      validate: {
        isEmail: true,
      },
    },
    leadstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leadsource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feequoted: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batchtiming: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    classmode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextfollowup: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    underscored: false,
  });
};

