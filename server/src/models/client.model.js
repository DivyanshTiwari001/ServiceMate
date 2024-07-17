import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


const clientSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        address:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        profilePhoto:{
            type:String,//cloudinary url
        }
    },
    {
        timestamps:true
    }
)

clientSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

clientSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
} 

clientSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullName,
            client:true
        },
        process.env.ACCESS_TOKEN_SECRET
        ,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const Client = mongoose.model("Client",clientSchema);