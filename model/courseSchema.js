// models/course.js
const { DataTypes } = require("sequelize");

const courseModel = async (sequelize) => {
  const Course = sequelize.define("Course", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseFee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courseBrochure: {
      type: DataTypes.STRING, // store the file path as a string
      allowNull: true,
    },
  });
  return Course;
};

module.exports = courseModel;
