import express from "express";
import db from "../models/models.js";
import {UserServices} from "../services/user.services.js";
import {Security} from "../middleware/security-middleware.js";

export const userController = (app, logger) => {
    const router = express.Router();
    const userService = new UserServices(db.User, db.Group, db.UserGroup);

    router.get(`/`, Security.isLoggedIn, async (req, res) => {
        res.json(await userService.getListUsers())
    });

    router.get(`/:id`, Security.isLoggedIn, async (req, res) => {
        res.json(await userService.getUser(parseInt(req.params.id)))
    });

    router.post(`/`, Security.isLoggedIn, async (req, res) => {
        res.json(await userService.createNewUser(req.body))
    });

    router.put(`/:id`, Security.isLoggedIn, async (req, res) => {
        res.json(await userService.updateUser(parseInt(req.params.id), req.body))
    });

    router.put(`/:id/assign/:group_id`, Security.isLoggedIn, async (req, res) => {
        res.json(await userService.assignPermission(req.params.id, req.params.group_id))
    })

    router.delete(`/:id`, Security.isLoggedIn, async (req, res) => {
        res.json(await userService.deleteUser(parseInt(req.params.id)));
    });

    app.use(`/api/user`, router);
}
