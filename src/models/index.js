import Sequelize from "sequelize";
import * as dotenv from "dotenv";
import {UserModel} from "./user.model.js";
import {GroupModel} from "./group.model.js";
import {UserGroupModel} from "./user-group.model.js";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
});


const db = {};
db.sequelize = sequelize;
db.User = UserModel(sequelize);
db.Group = GroupModel(sequelize);

db.User.belongsToMany(db.Group, {through: UserGroupModel(sequelize)});
db.Group.belongsToMany(db.User, {through: UserGroupModel(sequelize)});


export default db;
