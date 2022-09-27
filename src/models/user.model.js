import {Sequelize} from "sequelize";


export const UserModel = (sequelize) => sequelize.define("user", {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    }
})
