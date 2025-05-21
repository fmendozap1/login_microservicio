
const {Sequelize, Model, DataTypes}=require("sequelize");
const {sequelize}=require("../db/connection");

//definition of model
const Usuarios=sequelize.define("usuarios",{
    idUsuarios:{
        type:DataTypes.INTEGER, 
        primaryKey:true,
        autoIncrement:true,
    },
    nombres_usuario:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    tipo_identificacion_usuario:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    num_identificacion_usuario:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email_usuario:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password_usuario:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rol_usuario:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    estado_usuario:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    sequelize,
    modelName:"Usuarios",
});

module.exports=Usuarios;
