import { DataTypes } from "sequelize";

export const createLeadModel = (sequelize) => {
  return sequelize.define('lead', {
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
      validate: {
        isEmail: true,
      },
    },
    lead_status: {
      type: DataTypes.ENUM('New', 'Contacted', 'Qualified', 'Lost', 'Not Contacted'),
      allowNull: false,
    },
    lead_source: {
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
    fee_quoted: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batch_timing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    class_mode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    next_follow_up: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    underscored: true, // Automatically convert camelCase to snake_case
  });
};
