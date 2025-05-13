import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import 
import clientRouter from "./routes/client.routes.js";
import profRouter from "./routes/professional.routes.js";
import reviewRouter from "./routes/review.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";


// routes declaration
app.use("/api/v1/client",clientRouter)
app.use("/api/v1/professional",profRouter)
app.use("/api/v1/review",reviewRouter)
app.use("/api/v1/appointment",appointmentRouter)

export {app}