import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sgindpan','postgres','ares',{
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

export default sequelize;