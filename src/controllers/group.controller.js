import express from "express";
import db from "../models/models.js";
import {GroupService} from "../services/group.service.js";

export const groupController = (app) => {
    const router = express.Router();
    const groupService = new GroupService(db.Group, db.UserGroup);

    router.get(`/`, async (req, res) => {
        res.json(await groupService.getListGroups())
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
