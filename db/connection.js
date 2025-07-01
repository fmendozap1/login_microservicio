const {Sequelize}=require("sequelize");

const sequelize= new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host:process.env.DB_HOST,
    dialect: 'mysql',
    port:process.env.DB_PORT
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