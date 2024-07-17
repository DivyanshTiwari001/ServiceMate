import { Router } from "express"
import { changePassword, getAllProfessional, getAppointments, loginProf, logoutProf, registerProf, updateProfDetails } from "../controllers/professional.controller.js"
import { verifyJWTClient, verifyJWTProfessional } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    upload.single("profilePhoto"),
    registerProf
)
router.route("/login").post(loginProf)


router.route("/logout").post(verifyJWTProfessional, logoutProf)
router.route("/change-password").post(verifyJWTProfessional, changePassword)
router.route("/update-details").patch(
    verifyJWTProfessional,
    upload.single("profilePhoto"),
    updateProfDetails
)
router.route("/get-appointments").get(verifyJWTProfessional, getAppointments)
router.route("/get-all-professionals").get(verifyJWTClient,getAllProfessional)

export default router;