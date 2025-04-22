import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log(
            `\n MongoDB connected, DB Host is ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MongoDB connection FAILED!", error);
        process.exit();
    }
};

export default ConnectDB;
