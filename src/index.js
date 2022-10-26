import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import {userController} from "./controllers/user.controller.js";
import db from "./models/models.js";
import {groupController} from "./controllers/group.controller.js";
import infoLogger, {errorLogger} from "./logging/logging-service.js";
import {loggingRequest} from "./middleware/logger-middleware.js";
import process from 'node:process';
import {securityController} from "./controllers/security.controller.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors())


app.use(loggingRequest(infoLogger))

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

process.on('uncaughtException', (err, origin) => {
    errorLogger.log('error', {
        errorLogger: err.stack,
        origin
    });

});

userController(app, infoLogger);
groupController(app, infoLogger);
securityController(app, infoLogger);


function errorHandler (err, req, res, next) {
    console.log("ERRRO HANDLER?");

    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}

app.use(errorHandler)


const PORT = process.env.APP_PORT || 1212;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
