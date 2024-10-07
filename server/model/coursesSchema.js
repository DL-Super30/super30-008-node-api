import { DataTypes } from "sequelize";

export const createCourseModel = async (sequelize) => {
  return sequelize.define('Courses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Brochure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'courses',
  });
};
