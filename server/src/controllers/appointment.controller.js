import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Professional } from "../models/professional.model.js";
import { Client } from "../models/client.model.js";


// create Appointment

const createAppointment = asyncHandler(async(req,res)=>{
    const {date,issue} = req.body;
    const {profId} = req.params;
    const clientId = req.client?._id;

    if(!date){
        throw new ApiError(400,"invalid appointment")
    }

    if(!(profId && isValidObjectId(profId))){
        throw new ApiError(400,"invalid appointment request")
    }

    const prof = await Professional.findById(profId)
    const client = await Client.findById(clientId)

    if(!prof || !client){
        throw new ApiError(400,"invalid request to book appointment")
    }

    const dateObj = new Date(date)

    const appointment = await Appointment.create({
        client:client?._id,
        professional:prof?._id,
        date:dateObj,
        issue
    })

    if(!appointment){
        throw new ApiError(500,"not able to book appointment")
    }
    const appointmentDoc = await Appointment.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(appointment?._id)
            }
        },
        {
            $lookup:{
                from:"professionals",
                localField:"professional",
                foreignField:"_id",
                as:"professional_details",
                pipeline:[
                    {
                        $project:{
                            fullName:1,
                            username:1,
                            phone:1,
                            profilePhoto:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                professional_details:{
                    $first:"$professional_details"
                }
            }
        }
    ])

    if(!appointmentDoc){
        throw new ApiError(500,"something went wrong")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,appointmentDoc[0],"appointment created successfully"))
})


// update Appointment status
const updateAppointmentStatus = asyncHandler(async(req,res)=>{
    const {status} = req.body
    const {appointmentId} = req.params

    if(!status || !(appointmentId && isValidObjectId(appointmentId))){
        throw new ApiError(400,"invalid request to update appointment")
    }

    const appointment = await Appointment.findOne({_id:appointmentId})
    
    if(!appointment){
        throw new ApiError(404,"appointment not found")
    }

    appointment.status = status
    await appointment.save()
    
    const appointmentDoc = await Appointment.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(appointment?._id)
            }
        },
        {
            $lookup:{
                from:"clients",
                localField:"client",
                foreignField:"_id",
                as:"client_details",
                pipeline:[
                    {
                        $project:{
                            fullName:1,
                            username:1,
                            address:1,
                            phone:1,
                            profilePhoto:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                client_details:{
                    $first:"$client_details"
                }
            }
        }
    ])

    if(!appointmentDoc){
        throw new ApiError(500,"something went wrong")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,appointmentDoc[0],"updated status successfully"))
})

const cancelAppointment = asyncHandler(async(req,res)=>{
    const {appointmentId} = req.params

    if(!(appointmentId && isValidObjectId(appointmentId))){
        throw new ApiError(400,"invalid request to cancel appointment")
    }

    const appointment = await Appointment.findOne({_id:appointmentId})

    if(!appointment){
        throw new ApiError(404,"appointment not found")
    }

    appointment.status = "cancelled"
    await appointment.save()

    const appointmentDoc = await Appointment.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(appointment?._id)
            }
        },
        {
            $lookup:{
                from:"professionals",
                localField:"professional",
                foreignField:"_id",
                as:"professional_details",
                pipeline:[
                    {
                        $project:{
                            fullName:1,
                            username:1,
                            phone:1,
                            profilePhoto:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                professional_details:{
                    $first:"$professional_details"
                }
            }
        }
    ])
    return res
    .status(200)
    .json(new ApiResponse(200,appointmentDoc[0],"appointment cancelled successfully"))
})



export {createAppointment,updateAppointmentStatus,cancelAppointment}