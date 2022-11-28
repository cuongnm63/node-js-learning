import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY} from "../enum/constraints.js";
import db from "../models/models.js";

export const Security = {
    isLoggedIn: async (req, res, next) => {
        const authToken = req.headers["Authorization"] ?? req.headers["authorization"];

        if (!authToken) {
            res.status(401).send("Unauthorized Error");
        } else {
            const token = authToken.replace("Bearer ", "");
            try {
                req.user = await jwt.verify(token, JWT_SECRET_KEY);
                next();
            } catch (err) {
                res.status(403).send("Forbidden Error")
            }
        }
    }
}
