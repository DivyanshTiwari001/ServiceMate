import {Router} from "express"
import { changePassword, loginClient, logoutClient, registerClient, updateClientDetails } from "../controllers/client.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTClient} from "../middlewares/auth.middleware.js"


const router = Router();


router.route("/register").post(
    upload.single("profilePhoto"),
    registerClient
)
router.route("/login").post(loginClient)


router.route("/logout").post(verifyJWTClient,logoutClient)
router.route('/change-password').post(verifyJWTClient,changePassword)
router.route('/update-client').patch(verifyJWTClient,updateClientDetails)

export default router;