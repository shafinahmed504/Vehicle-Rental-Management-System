
import { ObjectId } from "mongodb";
import { vehicles } from "../config/models/vehicle.model";
import { Vehicle } from "../types/vehicleType";







const createVehicle=async(vehicle:Vehicle)=>{
    

    const result=await vehicles.insertOne(vehicle)
        
        return result;
        
    
}

const getAllVehicles=async(status?:"available"|"unavailable")=>{
    const filter=status ? {status}:{}
    const result=await vehicles.find(filter).toArray()

    return result;
}



const getVehicleById=async(id:string)=>{

    const result=await vehicles.findOne({
        _id:new ObjectId(id)
    })

    return result;


}


const updateVehicle=async(id:string,updatedData:Partial<Vehicle>)=>{
    const result=await vehicles.findOneAndUpdate(
        {_id:new ObjectId(id)},
        {$set:updatedData},
        {returnDocument:"after"}

    )

    return result
}


const deleteVehicle=async(id:string)=>{
    const result=await vehicles.deleteOne({
        _id:new ObjectId(id)
    })

    return result
}









export const vehicleServices={
    createVehicle,getAllVehicles,getVehicleById,updateVehicle,deleteVehicle
}