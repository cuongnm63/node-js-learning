import express from "express";
import db from "../models/index.js";
import {UserServices} from "../services/user.services.js";

export const userController = (app) => {
    const router = express.Router();
    const userService = new UserServices(db.User);

    router.get(`/`, async (req, res) => {
        res.json(await userService.getListUsers())
    });

    router.get(`/:id`, async (req, res) => {
        res.json(await userService.getUser(parseInt(req.params.id)))
    });

    router.post(`/`, async (req, res) => {
        res.json(await userService.createNewUser(req.body))
    });

    router.put(`/:id`, async (req, res) => {
        res.json(await userService.updateUser(parseInt(req.params.id), req.body))
    });

    router.delete(`/:id`, async (req, res) => {
        res.json(await userService.deleteUser(parseInt(req.params.id)));
    });

    app.use(`/api/user`, router);
}
