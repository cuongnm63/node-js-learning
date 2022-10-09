import {Sequelize} from "sequelize";


export const UserGroupModel = (sequelize) => sequelize.define("user_group", {
    user_id: {
        type: Sequelize.INTEGER
    },
    group_id: {
        type: Sequelize.INTEGER
    }
})
