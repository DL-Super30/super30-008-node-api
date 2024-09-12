const { DataTypes, Sequelize } = require("sequelize");

const createLeadModel = async (sequelize) => {
  const LeadTb = sequelize.define(
    "LeadTb",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      leadname: {
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
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      feeQuoted: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batchTiming: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leadStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leadSource: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      selectedClassMode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Now Sequelize.NOW is defined
      },
      nextFollowUp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email"], // Create a unique index on the email column
        },
        {
          fields: ["leadStatus"], // Non-unique index on the leadStatus column
        },
      ],
    }
  );
  return LeadTb;
};

module.exports = createLeadModel;
