import {UserDataMapper} from "../data-access/user-data-mapper.js";

export class UserServices {
    constructor(userModel) {
        this.userModel = userModel;
        this.mapper = new UserDataMapper();
    }

    getListUsers = async () => {
        const users = await this.userModel.findAll({attributes: ["name", "username", "id"]});

        return users.map((user) => ({
            ...user.dataValues,
            ...this.mapper.toDataEntity(user.dataValues)
        }));
    }

    getUser = async (id) => {
        const user = await this.userModel.findByPk(id, {attributes: ["name", "username", "id"]});
        if (!user) {
            return {error: "User not found!"};
        }

        return {...user.dataValues, ...this.mapper.toDataEntity(user.dataValues)};
    }

    createNewUser = async (user) => {
        const createdUser = await this.userModel.create(user);
        console.log(createdUser);

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

    deleteUser(id) {
        return this.userModel.destroy({
            where: {id}
        })
    }

}
