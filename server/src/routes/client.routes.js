import {Router} from "express"
import { changePassword, deleteAppointment, getAppointments, getClientInfo, loginClient, logoutClient, registerClient, updateClientDetails } from "../controllers/client.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTClient} from "../middlewares/auth.middleware.js"


const router = Router();


router.route("/register").post(
    upload.single("profilePhoto"),
    registerClient
)
router.route("/login").post(loginClient)


router.route("/logout").get(verifyJWTClient,logoutClient)
router.route('/change-password').post(verifyJWTClient,changePassword)
router.route('/update-details').patch(verifyJWTClient,
    upload.single("profilePhoto")
    ,updateClientDetails)
router.route('/get-appointments').get(verifyJWTClient,getAppointments)
router.route('/get-client').get(verifyJWTClient,getClientInfo)
router.route('/delete-appointment').delete(verifyJWTClient,deleteAppointment)

export default router;