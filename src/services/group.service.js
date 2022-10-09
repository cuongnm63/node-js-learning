export class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    getListGroups = async () => await this.groupModel.findAll({})

    getGroupByID = async (id) => {
        const group = await this.groupModel.findByPk(id);
        if (!group) {
            return {error: "Group not found!"};
        }

        return group;
    }

    createNewGroup = async (group) => await this.groupModel.create(group)
    updateGroup = async (id, group) => {
        const foundGroup = await this.getGroupByID(id);
        if (foundGroup.error) {
            return foundGroup;
        }

        await this.groupModel.update(group, {
            where: {id}
        });

        return this.getGroupByID(id);
    }

    deleteGroup(id) {
        return this.groupModel.destroy({
            where: {id}
        })
    }

}
