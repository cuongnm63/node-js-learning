import {Sequelize} from "sequelize";
import {PERMISSION, PERMISSION_ALLOWED} from "../enum/permission.enum.js";


export const GroupModel = (sequelize) => sequelize.define("group", {
    name: {
        type: Sequelize.STRING
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
}, {
    validate: {
        isValidPermissionType() {
            for (let permission of this.permissions) {
                if (!PERMISSION_ALLOWED.find(p => p == permission)) {
                    throw new Error(`Invalid permission type: ${permission}`)
                }
            }
        }
    }
})
