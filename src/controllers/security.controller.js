import express from "express";
import db from "../models/models.js";
import {SecurityServices} from "../services/security.services.js";

export const securityController = (app) => {
    const router = express.Router();
    const securityServices = new SecurityServices(db.User);

    router.post(`/login`, async (req, res) => {
        try {
            res.json(await securityServices.login(req.body))
        } catch (error) {
            res.status(500).json({message: error})
        }
    });


    app.use(`/api`, router);
}
