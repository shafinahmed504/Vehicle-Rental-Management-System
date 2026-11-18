import express from "express"
import { bookingControllers } from "./bookingControllers"
import { auth } from "../middleware/auth"


const router=express.Router()

export const bookingRouter=router


router.post("/createBookings",auth("admin","customer"),bookingControllers.createBooking)

router.get("/",auth("admin"),bookingControllers.getBookings)

router.get("/myBookings",auth("customer"),bookingControllers.getMyBookings)
router.get("/:id",auth("admin"),bookingControllers.getBookingById)



router.patch("/status/:id",auth("admin","customer"),bookingControllers.updateBooking)