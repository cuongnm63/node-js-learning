import {Sequelize} from "sequelize";
import {PERMISSION, PERMISSION_ALLOWED} from "../enum/permission.enum.js";


export const GroupModel = (sequelize) => sequelize.define("group", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
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
