import mongoose,{Schema}  from "mongoose";


const appointmentSchema = new Schema(
    {
        client:{
            type:Schema.Types.ObjectId,
            ref:"Client"
        },
        professional:{
            type:Schema.Types.ObjectId,
            ref:"Professional"
        },
        date:{
            type:Date,
            required:true
        },
        issue:{
            type:String,
        },
        status:{
            type:String,
            enum:["accepted","rejected","pending","completed","cancelled"],
            default:"pending"
        }
    },
    {timestamps:true}
)

export const Appointment = mongoose.model("Appointment",appointmentSchema)