import { db } from "./db";
import { bookingValidator } from "./validators/bookingValidator";
import { paymentValidator } from "./validators/paymentValidator";
import { vehicleValidator } from "./validators/vehicleValidator";

export async function initCollections(){

    const collections=[
        {name:"vehicles",validator:vehicleValidator},
        {name:"bookings",validator:bookingValidator},
        {name:"payments",validator:paymentValidator}
    ]

    for(const {name,validator} of collections){
        const existing=await db.listCollections({name}).toArray();

        if(!existing.length){

        await db.createCollection(name,{validator})
        
        }
    }

    console.log("tables created successfully")

}