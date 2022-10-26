import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY} from "../enum/constraints.js";

export class SecurityServices {
    constructor(userModel) {
        this.userModel = userModel;
    }

    login = async ({username, password}) => {
        const user = await this.userModel.findOne({where: {username, password}, attributes: ["name", "username", "id"]});
        if (user) {
            const token = await jwt.sign(user, JWT_SECRET_KEY);
            return {token, user}
        } else {
            throw "Invalid username or password"
        }
    }

}
