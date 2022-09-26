import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

app.get("/", (req: any, res: { json: (arg0: { message: string; }) => void; }) => {
    res.json({ message: "Welcome to Cuong Test" });
});

const PORT = process.env.APP_PORT || 1212;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
