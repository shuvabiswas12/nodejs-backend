import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

/**
 * This function is a async function and this type of function returns promise itselt bydefault. 
 * this function is actually like:
 * 
 * const ConnectDB = () => {
        return new Promise.resolve();   
    }
*/
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
