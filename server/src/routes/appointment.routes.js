import {Router} from "express";
import {verifyJWTClient, verifyJWTProfessional, verifyJWTUser } from "../middlewares/auth.middleware.js";
import { cancelAppointment, createAppointment,getAll ,getOne, updateAppointmentStatus } from "../controllers/appointment.controller.js";


const router = Router()

// create appointment
router.route('').post(verifyJWTClient,createAppointment);
// get appointemnts
router.route('').get(verifyJWTUser,getAll)

// get one
router.route('/:id').get(verifyJWTUser,getOne)

// update appointment
router.route('/:id').patch(verifyJWTProfessional,updateAppointmentStatus);

// cancel appointment
router.route('/:id/cancel').patch(verifyJWTClient,cancelAppointment);

export default router;