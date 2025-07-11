import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

/**
 * 
 * From frontend form looks like this:-
 *  <form action="/register" method="POST" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <input type="file" name="coverImage" />
        <button type="submit">Submit</button>
    </form>
 */
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
