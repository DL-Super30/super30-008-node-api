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
    cc: {
      type: DataTypes.STRING,
      allowNull: true,
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
    feeQuoted: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    batchTiming: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leadStatus: {
      type: DataTypes.ENUM('notContacted', 'Attempted', 'Warm Lead', 'Cold Lead'),
      allowNull: false,
    },
    stack: {
      type: DataTypes.ENUM('Select Stack','Life Skills','Study Abroad','HR'),
      allowNull: false,
    },
    classMode: {
      type: DataTypes.ENUM('Select Class Mode','International Online','India Online','BLR Class Room','HYD Class Room'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    opportunityStatus: {
      type: DataTypes.ENUM('Select Opportunity Status','Visiting','Visited','demoAttended','lost Opportunity'),
      allowNull: false,
    },
    opportunityStage: {
      type: DataTypes.ENUM('Select Opportunity Stage','None','Advanced Discussion','Ready To Join','Visiting','Fees Negotiation','Batch Allocation','Interested in Demo','Need Time This Week','Need Time Next Week','Need Time This Month','Need Time Next Month','Special Requirements','Payment Link Sent','Closed won (Registered)','Busy & Asked a call back','Closed Lost'),
      allowNull: true,
    },
    demoAttendedStage: {
      type: DataTypes.ENUM('Select Demo Attended Stage','None','Advanced Discussion','Call Not Answered','Visiting','Fees Negotiation','Batch Allocation','Need Time This Week','Need Time Next Week','Need Time This Month','Need Time Next Month','Special Requirements','Closed won (Registered)','Closed Lost (Cold Lead)'),
      allowNull: true,
    },
    visitedStage: {
      type: DataTypes.ENUM('Select Visited Stage','None','Call Not Answered','Ready To Join','Fees Negotiation','Batch Allocation','Interested Demo','Special Requirements ',
        'Need Time This Week','Need Time Next Week','Need Time This Month','Need Time Next Month','Closed won (Registered)','Closed Lost (Cold Lead)'),
      allowNull: true,
    },
    lostOpportunityReason: {
      type: DataTypes.ENUM('Select Lost Opportunity Reason','None','Invalid Number','Not Interested','Joined Another Institute','Asking Free Course','Pay After Placement'),
      allowNull: true,
    },
    nextFollowUp: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    leadSource: {
      type: DataTypes.ENUM('None','Walk In','Student Referral','Demo','WebSite','Website Chat','Inbound Call','Google AdWords','Facebook Ads','Google My Business','WhatsApp - Skill Capital'),
      allowNull: true,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    underscored: true, // Automatically convert camelCase to snake_case in DB
  });
};
