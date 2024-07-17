import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Client } from "../models/client.model.js";
import { Professional } from "../models/professional.model.js"



const verifyJWTClient = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken
    try {
        if (!token) {
            throw new ApiError(400, "Unauthorized request")
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const client = await Client.findById(decodedToken?._id).select("-password")

        if (!client) {
            throw new ApiError(400, "Invalid Access Token")
        }

        req.client = client;
        next();
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid access token")
    }
})

const verifyJWTProfessional = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken
    try {
        if (!token) {
            throw new ApiError(400, "Unauthorized request")
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const professional = await Professional.findById(decodedToken?._id).select("-password")

        if (!professional) {
            throw new ApiError(400, "Invalid Access Token")
        }

        req.prof = professional;
        next();
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid access token")
    }
})


export { verifyJWTClient, verifyJWTProfessional }