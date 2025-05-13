import {Router} from "express"
import { addReview,deleteReview,updateReview,getReviews } from "../controllers/review.controller.js"
import { verifyJWTUser,verifyJWTClient } from "../middlewares/auth.middleware.js"


const router = Router()

router.route('/:profId').post(verifyJWTClient,addReview)
router.route('/:reviewId').delete(verifyJWTClient,deleteReview)
router.route('/:reviewId').patch(verifyJWTClient,updateReview)
router.route('/:profId').get(verifyJWTUser,getReviews)

export default router;