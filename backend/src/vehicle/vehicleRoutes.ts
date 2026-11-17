import express from "express"
import { vehicleControllers } from "./VehicleControllers";
import { auth } from "../middleware/auth";

const router=express.Router();

export const vehicleRouter=router

router.post("/create_vehicle",vehicleControllers.createVehicle)

router.get("/",vehicleControllers.getAllVehicles)
router.get("/:id",vehicleControllers.getVehicleById)

router.put("/:id",auth("admin"),vehicleControllers.updateVehicle)

router.delete("/:id",auth("admin"),vehicleControllers.deleteVehicle)
