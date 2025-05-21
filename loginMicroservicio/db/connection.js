const {Sequelize}=require("sequelize");

const sequelize= new Sequelize("db_login","root","Soporte2025+",{
    host:"localhost",
    dialect:"mysql",
    port:"3306"
})

async function stablish_conection(){
    try{
        await sequelize.authenticate();
        console.log("Connection Success");
    }
    catch(error){
        console.error(error);
    }
}

module.exports={sequelize,stablish_conection}