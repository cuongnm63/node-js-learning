import express from "express";
import db from "../models/models.js";
import {GroupService} from "../services/group.service.js";
import {loggingRequest} from "../middleware/logger-middleware.js";

export const groupController = (app) => {
    const router = express.Router();
    const groupService = new GroupService(db.Group, db.UserGroup);

    router.get(`/`, async (req, res, next) => {
        return res.json(await groupService.getListGroups()).catch((err) => {
            next(err)
        })
    });

    router.get(`/:id`, async (req, res) => {
        res.json(await groupService.getGroupByID(req.params.id))
    });

    router.post(`/`, async (req, res) => {
        res.json(await groupService.createNewGroup(req.body))
    });

    router.put(`/:id`, async (req, res) => {
        res.json(await groupService.updateGroup(req.params.id, req.body))
    });

    router.delete(`/:id`, async (req, res) => {
        res.json(await groupService.deleteGroup(req.params.id));
    });

    app.use(`/api/group`, router);
}
