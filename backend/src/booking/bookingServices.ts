import { ObjectId } from "mongodb"
import { bookings } from "../config/models/booking.model"
import { Booking, updateBookingType } from "../types/bookingType"
import { vehicles } from "../config/models/vehicle.model"

const createBooking=async(bookingData:Booking)=>{

        const start_date=new Date(bookingData.start_date)
        const end_date=new Date(bookingData.end_date)
        const vehicleId=new ObjectId(bookingData.vehicleId)
        const vehicle=await vehicles.findOne({_id:vehicleId})

        if(isNaN(end_date.getTime()) || isNaN(start_date.getTime())){
            throw new Error("Invalid dates")
        }

        if(end_date<=start_date){
            throw new Error("Invalid Dates")
        }
       

        if(!vehicle){
            throw new Error("Vehicle Not found")
        }

        const pricePerDay=vehicle.pricePerDay;

        const conflict=await bookings.findOne({
            vehicleId,
            status:{$ne:"cancelled"},
            start_date:{$lt:end_date},
            end_date:{$gt:start_date}


        })

        if(conflict){
            throw new Error("Vehicle is already booked for these dates")
        }


        const difference=end_date.getTime()-start_date.getTime()
        const totalDays = difference / (1000 * 60 * 60 * 24);

        const totalPrice=pricePerDay * totalDays;




    const data={
        ...bookingData,
        vehicleId,
        start_date,
        end_date,
        totalPrice,
        status:"pending",
        createdAt:new Date(Date.now())

    }

    

    
    
    const result=await bookings.insertOne(data)

    return result

}

const getBookings=async()=>{

    const result=await bookings.find({}).toArray()

    return result

}


const getBookingById=async(id:string)=>{

    const result=await bookings.findOne({_id:new ObjectId(id)})

    return result
    

}

const getMyBookings=async(userId:string)=>{

    const result=await bookings.find({userId}).toArray();

    return result;


}


const updateBooking=async(userId:string,role:string,data:updateBookingType)=>{

    const booking=await bookings.findOne({_id:new ObjectId(data.id)})

    if(!booking){

        throw new Error("Booking does not exists!")

    }

    if(booking.userId!=userId && role=="customer"){
        throw new Error("You can only cancel your booking")

    }

    if(role=="customer" && data.status!="cancelled"){
        throw new Error("Customers can only cancel bookings")
    }



    const result=await bookings.updateOne({_id:new ObjectId(data.id)},
    {
        $set:{status:data.status}
    })

    return result

    

}







export const bookingServices={
    createBooking,getBookings,getBookingById,updateBooking,getMyBookings
}