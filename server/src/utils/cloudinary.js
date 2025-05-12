import {v2 as cloudinary } from"cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath)return null
        
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
        {
            resource_type:"auto"
        })

        fs.unlinkSync(localFilePath)

        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)
        return null
    }
}

const removeFromCloudinary = async(fileUrl)=>{
    try{
        if(!fileUrl)return null;
        const publicId = fileUrl.substring(fileUrl.lastIndexOf('/')+1,fileUrl.lastIndexOf('.'));
        await cloudinary.uploader.destroy(publicId); 
    }catch(err){
        return null;
    }
}

export {uploadOnCloudinary,removeFromCloudinary}