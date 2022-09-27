import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./models/index";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());


db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err: {message: string}) => {
        console.log("Failed to sync db: " + err.message);
    })

app.get("/", (req: any, res: any) => {
    res.json({ message: "Welcome to Cuong Test" });
})

const PORT = process.env.APP_PORT || 1212;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
