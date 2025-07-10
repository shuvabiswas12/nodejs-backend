import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullName, password, email } = req.body;

    if (
        [fullName, username, email, password].some(
            (field) => field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required.");
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists.");
    }

    // We can access the files as multer put the file access operation into the request throw the middleware
    // we just got the local file path as the file have not uploaded to the server yet.
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocatPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocatPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email,
        username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering te user."
        );
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User successfully created."));
});

export { registerUser };
