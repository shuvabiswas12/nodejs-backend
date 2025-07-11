import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// express.json() -> Built-in middleware in Express to parse incoming JSON payloads in req.body.
// { limit: "16kb" } -> Sets the maximum size of incoming JSON request body to 16 kilobytes.
// Prevents clients from sending large JSON payloads that can overwhelm your server (e.g., DoS attack).
// Helps optimize memory usage.
app.use(express.json({ limit: "16kb" }));

// passing data through nesting object through url.
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

// for accessing secure cookie form browser.
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
