import { Request, Response } from "express";
import { vehicleServices } from "./VehicleServices";

const createVehicle=async(req:Request,res:Response)=>{
    
    try {
        const result=await vehicleServices.createVehicle(req.body)

        res.status(200).json({
            success:true,
            data:result
        })
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            data:error.message
        })
        
    }
}


const getAllVehicles=async(req:Request,res:Response)=>{
    try{
        const status=req.query?.status as "available"|"unavailable"
        const result= await vehicleServices.getAllVehicles(status)
        res.status(200).json({
            success:true,
            message:"vehicles retrieved successfully",
            data:result
        })
        
    }catch(error:any){
                res.status(500).json({
            success:false,
            data:error.message
        })

    }
    
}


const getVehicleById=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const result=await vehicleServices.getVehicleById(id as string)
        res.status(200).json({
            success:true,
            data:result
        })
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const updateVehicle=async(req:Request,res:Response)=>{


    try{
        const {id}=req.params
        const result=await vehicleServices.updateVehicle(id as string,req.body)

        res.status(200).json({
        success:true,
        data:result
        })
        
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}



const deleteVehicle=async(req:Request,res:Response)=>{


    try{
        const {id}=req.params
        const result=await vehicleServices.deleteVehicle(id as string)

        res.status(200).json({
        success:true,
        data:result
        })
        
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}






export const vehicleControllers={
    createVehicle,getAllVehicles,getVehicleById,updateVehicle,deleteVehicle
}