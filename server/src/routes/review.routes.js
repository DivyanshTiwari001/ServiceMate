import {Router} from "express"
import { addReview,deleteReview,updateReview,getReviews } from "../controllers/review.controller.js"
import { verifyJWTClient } from "../middlewares/auth.middleware.js"


const router = Router()

router.route('/add-review/p/:profId').post(verifyJWTClient,addReview)
router.route('/delete-review/r/:reviewId').delete(verifyJWTClient,deleteReview)
router.route('/update-review/r/:reviewId').patch(verifyJWTClient,updateReview)
router.route('/get-reviews/p/:profId').get(verifyJWTClient,getReviews)

export default router;