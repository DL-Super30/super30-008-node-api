import { DataTypes } from "sequelize";

export const createUserModel=async(sequelize)=>{
    const User=sequelize.define('user',{
        
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,      
            autoIncrement: true
            
        },
       
        username:
        {
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
             },
       
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });
  
    return User;
}