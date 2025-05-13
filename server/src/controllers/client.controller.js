import mongoose,{isValidObjectId} from "mongoose";
import {Client} from "../models/client.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerClient = asyncHandler(async(req,res)=>{
    // 1.get user credentials from body
    // 2.upload profile photo if its there
    // 3.create document for client
    // 4.return response

    const {username,email,fullName,address,phone,password} = req.body;

    if([username,email,fullName,address,phone,password].some((field)=>field?.trim === "")){
        throw new ApiError(400,"All fields are required")
    }

    const profilePhotoLocalPath = req.file?.path;

    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);
    
    const client  = await Client.create(
        {
            username:username?.toLowerCase(),
            email,
            fullName,
            address,
            phone,
            password,
            profilePhoto:profilePhoto?.url || ""
        }
    )

    const createdUser = await Client.findById(client?._id).select("-password")

    if(!createdUser){
        throw new ApiError(500,"User not created");
    }

    const accessToken = await createdUser.generateAccessToken();

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .json(new ApiResponse(200,createdUser,"user created successfully"))
})

const loginClient = asyncHandler(async(req,res)=>{
    const {email,username,password} = req.body

    if(!(username || email)){
        throw new ApiError(400,"email or username required")
    }

    const client = await Client.findOne({$or: [{email},{username}]})

    
    if(!client){
        throw new ApiError(400,"Invalid Credentials")
    }

    const isValidPassword = await client.isPasswordCorrect(password)

    if(!isValidPassword){
        throw new ApiError(400,"Invalid Credentials")
    }

    const accessToken = client.generateAccessToken()

    const loggedInUser = await Client.findById(client._id).select("-password")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json(new ApiResponse(200,loggedInUser,"user login successfull"))

})

const logoutClient = asyncHandler(async(req,res)=>{
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
    // 1.get old password
    // 2.verify password
    // 3.get new password 
    // 4.update password
    const {oldPassword,newPassword} = req.body
    const {id} = req.params

    if(!id || !isValidObjectId(id) || req.client?._id.toString()!==id){
        throw new ApiError(400,"Unauthorized request")
    }

    if(!(oldPassword || newPassword)){
        throw new ApiError(400,"Both fields are required")
    }

    const client = await Client.findById(req.client?._id)

    const matchPassword = await client.isPasswordCorrect(oldPassword)
    
    if(!matchPassword){
        throw new ApiError(400,"Unauthorized Request!!")
    }

    client.password = newPassword
    client.save()

    return res
    .status(200)
    .json(new ApiResponse(200,{},"password updated successfully"))
})

const updateClientDetails = asyncHandler(async(req,res)=>{
    let {email,address,phone} = req.body
    const {id} = req.params

    if(!id || !isValidObjectId(id) || req.client?._id.toString() !== id ){

        throw new ApiError(400,"Unauthorized request")
    }

    const profilePhotoLocalPath = req.file?.path

    if(!(email || address || phone || profilePhotoLocalPath)){
        throw new ApiError(400,"Invalid request")
    }

    const client = await Client.findById(req.client?._id).select("-password")

    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath)

    const profilePhotoUrl = profilePhoto?.url || client.profilePhoto
    
    email = email ? email : client.email
    address = address ? address : client.address
    phone = phone ? phone : client.phone

    const updatedClient = await Client.findByIdAndUpdate(
        client._id,
        {
            $set:{
                email,
                address,
                phone,
                profilePhoto:profilePhotoUrl
            },
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,updatedClient,"Account details updated successfully"))
})

const self = asyncHandler(async (req,res)=>{
    const id = req?.client?._id;

    if(!id || !isValidObjectId(id)){
        throw new ApiError(400,"invalid request")
    }

    const client = await Client.findById(id).select("-password");
    if(!client){
        throw new ApiError(404,'user not found')
    }
    const modifiedClient = {...client._doc,isProf:false}
    return res
    .status(200)
    .json(
        new ApiResponse(200,modifiedClient,"client found successfully")
    )
})

const one = asyncHandler(async(req,res)=>{
    const {id} = req.params
    if(!id || !isValidObjectId(id)){
        throw new ApiError(400,"invalid request")
    }
    const client = await Client.findById(id).select("-password");
    if(!client){
        throw new ApiError(404,'user not found')
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,client,"client found successfully")
    )
})

export {registerClient,loginClient,logoutClient,changePassword,updateClientDetails,one,self}