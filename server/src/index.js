import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"


dotenv.config({
    path: "./.env"
})

connectDB()
.then(()=>{
    app.on("errror",(error)=>{
        console.log("ERRR : ",error);
    })
    const port  = process.env.PORT || 8000;
    app.listen(port,()=>{
        console.log(`Server is running at port : ${port}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!! ",err)
})