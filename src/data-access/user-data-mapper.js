import {EntityDataMapper} from "./entity-data-mapper.js";

export class UserDataMapper extends EntityDataMapper {
    toDomain(entity) {
        return {
            name: `${entity.firstName} ${entity.lastName}`
        }
    }

    toDataEntity(domain) {
        const [firstName, lastName] = domain.name.split(" ");
        return {
            firstName,
            lastName
        }
    }
}
