import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY} from "../enum/constraints.js";
import db from "../models/models.js";

export const Security = {
    isLoggedIn: async (req, res, next) => {
        if (!req.headers["Authorization"]) {
            res.status(401).send("Unauthorized Error");
        } else {
            const token = req.headers["Authorization"].replace("Bearer ", "");
            try {
                req.user = await jwt.verify(token, JWT_SECRET_KEY);
                next();
            } catch (err) {
                res.status(403).send("Forbidden Error")
            }
        }
    }
}
