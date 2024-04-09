import {Router} from "express"
import { loginClient, registerClient } from "../controllers/client.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTClient} from "../middlewares/auth.middleware.js"

const router = Router();


router.route("/register").post(
    upload.single("profilePhoto"),
    registerClient
)
router.route("/login").post(loginClient)


export default router;