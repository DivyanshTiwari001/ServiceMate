import mongoose, { isValidObjectId } from "mongoose";
import { Review } from "../models/review.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Client } from "../models/client.model.js"
import { Professional } from "../models/professional.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getRatings = async(profId)=>{
    const reviews = await Review.find({professional:profId});

    const sum = reviews.reduce((acc,review)=>{
        acc += review.rating
        return acc
    },0)

    return Math.ceil(sum/reviews.length)
}


const addReview = asyncHandler(async (req, res) => {
    const {profId} = req.params
    const { message, rating } = req.body

    if (!(message && rating)) {
        throw new ApiError("invalid request")
    }

    if (!(profId && isValidObjectId(profId))) {
        throw new ApiError(400, "invalid request to add review")
    }

    const prof = await Professional.findById(profId)
    const client = await Client.findById(req.client?._id)

    if (!prof || !client) {
        throw new ApiError(400, "invalid request")
    }

    const review = await Review.create(
        {
            client: client?._id,
            professional: prof?._id,
            message,
            rating
        }
    )

    const reviewDoc = await Review.findById(review?._id)

    const prof_rating = await getRatings(prof._id);
    prof.rating = prof_rating
    prof.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, reviewDoc, "review created successfully")
        )
})

const deleteReview = asyncHandler(async (req, res) => {
    const {reviewId} = req.params
    const clientId = req.client?._id

    if (!(reviewId && isValidObjectId(reviewId))) {
        throw new ApiError(400, "invalid request")
    }

    const deletedReview = await Review.deleteOne({ $and: [{ _id: reviewId }, { client: clientId }] })

    if (!deletedReview) {
        throw new ApiError(400, "invalid request by client")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deleteReview, "review deleted successfully"))

})

const updateReview = asyncHandler(async (req, res) => {
    const {reviewId} = req.params
    const clientId = req.client?._id

    const { message, rating } = req.body

    if (!(reviewId && isValidObjectId(reviewId))) {
        throw new ApiError(400, "invalid request")
    }

    if (!(message && rating)) {
        throw new ApiError(400, "both message and rating required")
    }

    const review = await Review.findOneAndUpdate(
        { $and: [{ _id: reviewId }, { client: clientId }] },
        {
            $set: {
                message,
                rating
            }
        },
        { new: true }
    )

    if (!review) {
        throw new ApiError(400, "implementations of changes failed")
    }

    const prof_rating = await getRatings(review.professional);
    prof.rating = prof_rating
    prof.save();

    return res
        .status(200)
        .json(new ApiResponse(200, review, "review updated successfully"))

})

const getReviews = asyncHandler(async (req, res) => {
    const {profId} = req.params;

    if (!(profId && isValidObjectId(profId))) {
        throw new ApiError(400, "id required")
    }

    const reviews = await Review.aggregate([
        {
            $match: {
                professional: new mongoose.Types.ObjectId(profId)
            }
            
        },
        {
            $lookup: {
                from: "clients",
                localField: "client",
                foreignField: "_id",
                as: "reviewer",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            profilePhoto: 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                reviewer:{
                    $first:"$reviewer"
                }
            }
        }
        
    ])

    if (!reviews) {
        throw new ApiError(400, "cant fetch reviews")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, reviews, "successfully fetched all reviews"))

})

export {addReview,deleteReview,updateReview,getReviews,getRatings}