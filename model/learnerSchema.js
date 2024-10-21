const { DataTypes, Sequelize } = require("sequelize");

const createLearnerModel = async (sequelize) => {
  const LearnerTb = sequelize.define(
    "LearnerTb",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      idProof: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Set to true if the field is optional
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      registeredDate: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Set to true if the field is optional
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      batchId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alternatePhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      exchangeRate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attendedDemo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      learnerOwner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      learnerStage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      leadCreatedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      CounselingDoneBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      registeredCourse: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      techStack: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      courseComments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slackAccess: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lMSAccess: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferableTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      batchTiming: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      modeOfClass: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Comment: {
        type: DataTypes.STRING,
        allowNull: true,
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
      ],
    }
  );
  return LearnerTb;
};

module.exports = createLearnerModel;
