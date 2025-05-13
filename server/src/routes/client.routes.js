import {Router} from "express"
import { changePassword,one, self, loginClient, logoutClient, registerClient, updateClientDetails } from "../controllers/client.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTClient, verifyJWTUser} from "../middlewares/auth.middleware.js"


const router = Router();


router.route("").post(
    upload.single("profilePhoto"),
    registerClient
)
router.route("/login").post(loginClient)
router.route("/logout").post(verifyJWTClient,logoutClient)
router.route('/:id/password').post(verifyJWTClient,changePassword)
router.route('/:id').patch(verifyJWTClient,
    upload.single("profilePhoto")
    ,updateClientDetails)

router.route('/self').get(verifyJWTClient,self)
router.route('/:id').get(verifyJWTUser,one)

export default router;