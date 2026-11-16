export const vehicleValidator={
    $jsonSchema:{
        bsonType:"object",
        required:["photo_url","name","model","transmission","seats","pricePerDay","status"],
        properties:{
            photo_url:{bsonType:"string"},
            name:{bsonType:"string"},
            model:{bsonType:"string"},
            transmission:{enum:["auto","manual"]},
            seats:{bsonType:"int",minimum:1},
            pricePerDay:{bsonType:"number",minimum:1},
            status:{enum:["available","unavailable"]}
        }
    }
}