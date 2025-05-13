import { Router } from "express"
import { changePassword, getAllProfessional,self,one, loginProf, logoutProf, registerProf, updateProfDetails } from "../controllers/professional.controller.js"
import { verifyJWTProfessional, verifyJWTUser } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("").post(
    upload.single("profilePhoto"),
    registerProf
)
router.route("/login").post(loginProf)


router.route("/logout").post(verifyJWTUser, logoutProf)
router.route("/:id/password").post(verifyJWTUser, changePassword)
router.route("/:id").patch(
    verifyJWTUser,
    upload.single("profilePhoto"),
    updateProfDetails
)
router.route("").get(getAllProfessional)
router.route("/self").get(verifyJWTProfessional,self)
router.route("/:id").get(verifyJWTUser,one)

export default router;