import {Router} from "express"
import { changePassword, loginProf, logoutProf, registerProf } from "../controllers/professional.controller.js"
import { verifyJWTProfessional } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"



const router = Router()

router.route("/register").post(
    upload.single("profilePhoto"),
    registerProf
)
router.route("/login").post(loginProf)




router.route("/logout").post(verifyJWTProfessional,logoutProf)
router.route("/change-password").post(verifyJWTProfessional,changePassword)


export default router;