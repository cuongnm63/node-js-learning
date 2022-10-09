import {UserDataMapper} from "../data-access/user-data-mapper.js";

export class UserServices {
    constructor(userModel, groupModel, userGroupModel) {
        this.userModel = userModel;
        this.groupModel = groupModel;
        this.userGroupModel = userGroupModel;

        this.mapper = new UserDataMapper();
    }

    getListUsers = async () => {
        const users = await this.userModel.findAll({
            attributes: ["name", "username", "id"],
            include: {model: this.groupModel},
            through: {attributes: []}
        });

        return users.map((user) => ({
            ...user.dataValues,
            ...this.mapper.toDataEntity(user.dataValues)
        }));
    }

    getUser = async (id) => {
        const user = await this.userModel.findByPk(id, {
                attributes: ["name", "username", "id"],
                include: {model: this.groupModel},
                through: {attributes: []}
            }
        );
        if (!user) {
            return {error: "User not found!"};
        }

        return {...user.dataValues, ...this.mapper.toDataEntity(user.dataValues)};
    }

    createNewUser = async (user) => {
        const createdUser = await this.userModel.create(user);

        return this.getUser(createdUser.dataValues.id);
    }

    updateUser = async (id, user) => {
        const foundUser = await this.userModel.findByPk(id);
        if (!foundUser) {
            return {error: "User not found!"};
        }

        await this.userModel.update(user, {
            where: {id}
        });

        return this.getUser(id);
    }

    assignPermission = async (userID, groupID) => {
        const group = await this.groupModel.findByPk(groupID);
        if (!group) {
            return {error: "Group not found!"}
        }

        const user = await this.getUser(userID);
        if (user.error) return user;

        await this.userGroupModel.create({
            userId: parseInt(userID),
            groupId: groupID
        });
        return {success: "User added to group"}
    }

    deleteUser = async (id) => {
        await this.userGroupModel.destroy({
            where: {userId: parseInt(id)}
        });

        return this.userModel.destroy({
            where: {id}
        })
    }

}
