import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema(
    {
        client:{
            type:Schema.Types.ObjectId,
            ref:"Client"
        },
        professional:{
            type:Schema.Types.ObjectId,
            ref:"Professional"
        },
        message:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            enum:[1,2,3,4,5],
            required:true
        }
    },
    {timestamps:true}
)

export const Review = mongoose.model("Review",reviewSchema)