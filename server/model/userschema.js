import { DataTypes, INTEGER } from "sequelize";

export const createUserModel=async(sequelize)=>{
    const User=sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,       
            autoIncrement: true 
            
        },

        name:{
            type:DataTypes.STRING,
            allowNull:false
             },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });
    await User.sync();
    return User;
}