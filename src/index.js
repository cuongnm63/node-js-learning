import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import {userController} from "./controllers/user.controller.js";
import db from "./models/models.js";
import {groupController} from "./controllers/group.controller.js";


const app = express();
app.use(bodyParser.json());



db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " , err);
    })

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Cuong Test" });
});


userController(app);
groupController(app);

const PORT = process.env.APP_PORT || 1212;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
