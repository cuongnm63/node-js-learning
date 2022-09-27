import Sequelize from "sequelize";
import * as dotenv from "dotenv";
import {UserModel} from "./user.model.js";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
});


const db = {};
db.sequelize = sequelize;
db.User = UserModel(sequelize);



export default db;
