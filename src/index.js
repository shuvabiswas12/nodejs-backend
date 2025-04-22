import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

ConnectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {});
    })
    .catch((err) => {
        console.log("MongoDB connection failed.", err);
    });

/**
 * 
 * 
// another way to connect db


import express from "express";

const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log(error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening n port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(err);
        process.exit();
    }
})();

*/
