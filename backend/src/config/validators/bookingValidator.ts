export const bookingValidator={
    $jsonSchema:{
        bsonType:"object",
        required:[
            "userId",
            "vehicleId",
            "start_date",
            "end_date",
            "totalPrice",
            "status",
            "createdAt"
        ],
        properties:{

      userId: { bsonType: "string" },
      vehicleId: { bsonType: "objectId" },
      start_date: { bsonType: "date" },
      end_date: { bsonType: "date" },
      totalPrice: { bsonType: "number", minimum: 1 },
      status: {
        enum: ["pending", "confirmed", "cancelled", "completed"]
      },
      createdAt: { bsonType: "date" }

        }
    }
}