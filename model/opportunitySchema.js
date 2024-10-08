const { DataTypes, Sequelize } = require("sequelize");

const createOpportunityModel = async (sequelize) => {
  const OpportunityTb = sequelize.define(
    "OpportunityTb",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cc: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 15], // Minimum 10 characters, maximum 15 characters
          // is: /^\d+$/, // Regular expression to ensure only digits (no letters or special characters)
        },
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
      stack: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ClassMode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      opportunityStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      opportunitySatge: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DemoAttendedStage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visitedStage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lostOpportunityReason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nextFollowUp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      leadSource: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email"], // Create a unique index on the email column
        },
        {
          fields: ["opportunityStatus"], // Non-unique index on the leadStatus column
        },
      ],
    }
  );
  await OpportunityTb.sync({ alter: true });
  return OpportunityTb;
};

module.exports = createOpportunityModel;
