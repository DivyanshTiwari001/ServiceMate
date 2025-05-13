import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Client } from "../models/client.model.js";
import { Professional } from "../models/professional.model.js";

// Common function to extract and verify token
const getDecodedToken = (req) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        throw new ApiError(401, "Access token missing");
    }
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyJWTClient = asyncHandler(async (req, res, next) => {
    const decodedToken = getDecodedToken(req);
    const client = await Client.findById(decodedToken?._id).select("-password");
    if (!client) {
        throw new ApiError(401, "Invalid client access token");
    }
    req.client = client;

    if (next) next(); // Only call next() if running as middleware
});

const verifyJWTProfessional = asyncHandler(async (req, res, next) => {
    const decodedToken = getDecodedToken(req);
    const professional = await Professional.findById(decodedToken?._id).select("-password");
    if (!professional) {
        throw new ApiError(401, "Invalid professional access token");
    }
    req.prof = professional;

    if (next) next(); // Only call next() if running as middleware
});


const verifyJWTUser = asyncHandler(async (req, res, next) => {
    try {
        const decodedToken = getDecodedToken(req);
        
        const client = await Client.findById(decodedToken?._id).select("-password");
        if (client) {
            req.client = client;
            return next();
        }

        const professional = await Professional.findById(decodedToken?._id).select("-password");
        if (professional) {
            req.prof = professional;
            return next();
        }

        throw new ApiError(401, "Unauthorized: Not a valid client or professional");

    } catch (err) {
        throw new ApiError(401, "Invalid or missing token");
    }
});


export {verifyJWTClient,verifyJWTProfessional,verifyJWTUser};
