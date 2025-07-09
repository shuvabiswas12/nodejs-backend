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

app.use(express.json({ limit: "16kb" }));

// passing data through nesting object through url.
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

// for accessing secure cookie form browser.
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.get("/api/v1/users", userRouter);

export { app };
