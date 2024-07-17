import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const professionalSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        address: {
            type: String,
            required: true,
        },
        phone:{
            type:String,
            required:true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        profilePhoto: {
            type: String,//cloudinary url
        },
        experience:{
            type:Number,
            default:0,
            validate:{
                validator: function (value) {
                    return value >= 0
                },
                message:"Experience must be a Non negative number"
            }
        },
        field:{
            type:String,
            enum:['plumber','electrician','carpenter','painter','househelp'],
            index:true
        }
    },
    {
        timestamps: true
    }
)

professionalSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

professionalSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
} 

professionalSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullName,
            professional:true
        },
        process.env.ACCESS_TOKEN_SECRET
        ,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// professionalSchema.plugin(mongooseAggregatePaginate)

export const Professional = mongoose.model("Professional",professionalSchema)