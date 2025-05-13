import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Professional } from "../models/professional.model.js";
import { Client } from "../models/client.model.js";


// create Appointment

const createAppointment = asyncHandler(async(req,res)=>{
    const {date,issue,profId} = req.body;
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

    const appointmentobj =  await Appointment.findById(appointment._id)
    .populate({path:'professional',select:'fullName username email phone address profilePhoto'})
    .select("-isDeleted -updatedAt -createdAt")

    return res
    .status(200)
    .json(new ApiResponse(200,appointmentobj,"appointment created successfully"))
})


// update Appointment status
const updateAppointmentStatus = asyncHandler(async(req,res)=>{
    const {status} = req.body
    const {id} = req.params

    if(!status || !(id && isValidObjectId(id))){
        throw new ApiError(400,"invalid request to update appointment")
    }

    const appointment = await Appointment.findOne({_id:id})
    
    if(!appointment){
        throw new ApiError(404,"appointment not found")
    }

    appointment.status = status
    await appointment.save()

    const appointmentobj =  await Appointment.findById(appointment._id)
    .populate({path:'professional',select:'fullName username email phone address profilePhoto'})
    .select("-isDeleted -updatedAt -createdAt")
    
    if(!appointmentobj){
        throw new ApiError(500,"something went wrong")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,appointmentobj,"updated status successfully"))
})

const cancelAppointment = asyncHandler(async(req,res)=>{
    const {id} = req.params

    if(!(id && isValidObjectId(id))){
        throw new ApiError(400,"invalid request to cancel appointment")
    }

    const appointment = await Appointment.findOne({_id:id})

    if(!appointment){
        throw new ApiError(404,"appointment not found")
    }

    appointment.status = "cancelled"
    await appointment.save()

    return res
    .status(200)
    .json(new ApiResponse(203,{},"appointment cancelled successfully"))
})

const getAll = asyncHandler(async(req,res)=>{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const status = req.query.status || 'pending';
        
        const appointments = await Appointment.find({
            status:status,
            $or:[
                {client:req?.client?._id},
                {professional:req?.prof?._id}
            ]
        }).populate({path:'professional',select:'fullName username email phone address profilePhoto'})
        .select("-isDeleted -updatedAt -createdAt")
        .skip(skip)
        .limit(limit)

        return res
        .status(200)
        .json(new ApiResponse(200,appointments,"appointments fetched successfully"))
})

const getOne = asyncHandler(async(req,res)=>{
    const {id} = req.params

    if(!id  || !isValidObjectId(id)){
        throw new ApiError(400,"Invalid Appointment Id")
    }

    const appointment = await Appointment.findById(id)
    .populate({path:'professional',select:'fullName username email phone address profilePhoto'})
    .select("-isDeleted -updatedAt -createdAt");

    if(!appointment){
        throw new ApiError(404, "Appointment not found")
    }

    return res.status(200)
            .json(new ApiResponse(200,appointment,"appointment fetched successfully"))

})

const deleteAppointment = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    if(!(id && isValidObjectId(id))){
        throw new ApiError(400,"invalid request to delete appointment")
    }

    const appointment = await Appointment.findOne({
        _id:id,
        $or:[
            {client:req?.client?._id},
            {professional:req?.prof?._id}
        ]
    })

    if(!appointment){
        throw new ApiError(404,"appointment not found")
    }

    if(req.client)appointment.isDeleted.client = true;
    else if(req.prof)appointment.isDeleted.prof = true;

    await appointment.save()

    return res
    .status(203)
    .json(new ApiResponse(203,{},"appointment deleted successfully"));
    
})


export {createAppointment,updateAppointmentStatus,cancelAppointment,getAll,getOne,deleteAppointment}