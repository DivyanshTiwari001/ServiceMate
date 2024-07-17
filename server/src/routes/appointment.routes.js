import {Router} from "express";
import { verifyJWTClient, verifyJWTProfessional } from "../middlewares/auth.middleware.js";
import { cancelAppointment, createAppointment, updateAppointmentStatus } from "../controllers/appointment.controller.js";


const router = Router()

router.route('/create-appointment/p/:profId').post(verifyJWTClient,createAppointment);
router.route('/update-appointment/a/:appointmentId').patch(verifyJWTProfessional,updateAppointmentStatus);
router.route('/cancel-appointment/a/:appointmentId').patch(verifyJWTClient,cancelAppointment);


export default router;