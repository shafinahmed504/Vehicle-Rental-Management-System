export const paymentValidator = {
    $jsonSchema: {
        bsonType: "object",
        required: [
            "bookingId",
            "amount",
            "paymentMethod",
            "status",
            "createdAt"
        ],
        properties: {
            bookingId: { bsonType: "objectId" },
            amount: { bsonType: "number", minimum: 1 },
            paymentMethod: {
                enum: ["card", "paypal"]
            },
            status: {
                enum: ["pending", "completed", "failed", "refunded"]
            },
           
            createdAt: { bsonType: "date" }
        }
    }
};