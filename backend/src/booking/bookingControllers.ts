import { Request, Response } from "express";
import { bookingServices } from "./bookingServices";


const createBooking=async(req:Request,res:Response)=>{
    try {

        const userId=req.user?.id

        const result=await bookingServices.createBooking({userId,...req.body})

        

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

const getBookings=async(req:Request,res:Response)=>{
    try {
        const result=await bookingServices.getBookings()

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

const getBookingById=async(req:Request,res:Response)=>{

        try {
        const {id}=req.params
        
        const result=await bookingServices.getBookingById(id as string);
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

const getMyBookings=async(req:Request,res:Response)=>{
    try {
        const userId=req.user?.id
        const result=await bookingServices.getBookingById(userId as string)

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

const updateBooking=async(req:Request,res:Response)=>{

    try {
        const role=req.user?.role;
        const userId=req.user?.id;
        const {id}=req.params
        const result=await bookingServices.updateBooking(userId as string,role as string,{id,...req.body})

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






export const bookingControllers={
    createBooking,getBookings,getBookingById,updateBooking,getMyBookings
}