// registerProf
// loginProf
// logoutProf
// updateProfDetails
// getAppointments

import mongoose,{isValidObjectId} from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Professional } from "../models/professional.model.js";


const registerProf = asyncHandler(async(req,res)=>{
    const {username,email,fullName,address,phone,password,experience,field} = req.body;

    if([username,email,fullName,address,phone,password,experience,field].some((field)=>field?.trim==="")){
        throw new ApiError(400,"All fields are required")
    }

    const profilePhotoLocalPath = req.file?.path;

    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);

    const professional = await Professional.create(
        {
            username:username?.toLowerCase(),
            email,
            fullName,
            address,
            phone,
            password,
            profilePhoto:profilePhoto?.url || "",
            experience,
            field
        }
    )

    const createdUser = await Professional.findById(professional?._id).select("-password -createdAt -updatedAt")

    if(!createdUser){
        throw new ApiError(500,"User not created");
    }
    
    const accessToken = createdUser.generateAccessToken();
    
    const options = {
        httpOnly: true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json(new ApiResponse(200,createdUser,"user created successfully"))
})

const loginProf = asyncHandler(async(req,res)=>{
    const {email,username,password} = req.body
    
    if(!(username || email)){
        throw new ApiError(400,"email or username required")
    }

    const prof = await Professional.findOne({$or: [{email},{username}]})
    
    if(!prof){
        throw new ApiError(400,"Invalid Credentials")
    }

    const isValidPassword = await prof.isPasswordCorrect(password)

    if(!isValidPassword){
        throw new ApiError(400,"Invalid Credentials")
    }

    const accessToken = prof.generateAccessToken()
    
    const loggedInUser = await Professional.findById(prof._id).select("-password")
    
    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json(new ApiResponse(200,loggedInUser,"user login successfull"))
})

const logoutProf = asyncHandler(async(_,res)=>{
      const options = {
        httpOnly:true,
        secure:true
      }

      return res
      .status(200)
      .clearCookie("accessToken",options)
      .json(new ApiResponse(200,{},"client logged out"))
})

const changePassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body;

    if(!(oldPassword && newPassword)){
        throw new ApiError(400,"Both fields are mandatory")
    }

    const prof  = await Professional.findById(req.prof?._id)
    const matchPassword = await prof.isPasswordCorrect(oldPassword)

    if(!matchPassword){
        throw new ApiError(400,"Unauthorized request")
    }

    prof.password = newPassword;
    prof.save()

    return res
        .status(200)
        .json(new ApiResponse(200,{},"password updated successfully"))

 })

const updateProfDetails = asyncHandler(async(req,res)=>{
    let {email,address,phone} = req.body
    let profilePhotoLocalPath = req.file?.path

    if(!(email || address || phone || profilePhotoLocalPath)){
        throw new ApiError(400,"invalid request");
    }

    const prof = await Professional.findById(req.prof?._id)
    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath)


    email = email || prof.email;
    address = address || prof.address;
    phone = phone || prof.phone;
    const profilePhotoUrl = profilePhoto?.url || prof.profilePhoto

    const updatedProf = await Professional.findByIdAndUpdate(
        prof._id,
        {
            $set:{
                email,
                address,
                phone,
                profilePhoto:profilePhotoUrl
            }
        },
        {
            new: true
        }
    ).select("-password -createdAt -updatedAt")

    if(!updatedProf){
        throw new ApiError(400,"Something went wrong")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,updatedProf,"details updated successfully")
    )
})


const self = asyncHandler(async(req,res)=>{
    const profId = req.prof?._id;
    if(!profId){
        throw new ApiError(400,"invalid request")
    }
    const prof = await Professional.findById(profId).select("-password -createdAt -updatedAt");

    if(!prof){
        throw new ApiError(404,'user not found')
    }

    const modified_prof = {...prof._doc,isprof:true}

    return res
    .status(200)
    .json(
        new ApiResponse(200,modified_prof,"user found successfully")
    )
})
const one = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    if(!id || !isValidObjectId(id)){
        throw new ApiError(400,"invalid request")
    }
    const prof = await Professional.findById(id).select("-password -createdAt -updatedAt");

    if(!prof){
        throw new ApiError(404,'user not found')
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,prof,"user found successfully")
    )
})

const getAllProfessional = asyncHandler(async(req,res)=>{
    const limit = parseInt(req.query.limit,10) || 3;
    const page = parseInt(req.query.page,10) || 1;
    const skip = (page-1)*limit;
    const fieldNumber = (req.query.field)?parseInt(req.query.field,10):-1;
    const fields = ['plumber','electrician','carpenter','painter','househelp'];
    const pipeline = [];
    if(fieldNumber>=0 && fieldNumber<=fields.length){
       pipeline.push({
        $match:{
            field: fields[fieldNumber]
        }
    });
    }
    pipeline.push(
        {$limit:limit},
        {$skip : skip},
        {
            $project:{
                _id:1,
                fullName:1,
                address:1,
                profilePhoto:1,
                field:1,
                experience:1,
                rating:1
            }
        }
    )

    const result = await Professional.aggregate(pipeline);

    return res
    .status(200)
    .json(new ApiResponse(200,result,"all documents succesfully fetched"))

}) 

export {registerProf,loginProf,logoutProf,changePassword,updateProfDetails,self,one,getAllProfessional}