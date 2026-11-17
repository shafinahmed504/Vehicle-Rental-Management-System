import express from "express"
import dotenv from "dotenv"
import { connectToMongoDB } from "./config/db"
import { initCollections } from "./config/initDB"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"
import { vehicleRouter } from "./vehicle/vehicleRoutes"


dotenv.config()


const app=express()

app.use(express.json())

const port=process.env.PORT

app.all("/api/auth/*splat",toNodeHandler(auth))
app.use("/vehicles",vehicleRouter)


async function start() {
    try{
    await connectToMongoDB();
    await initCollections();
    const server=app.listen(port,()=>{
    console.log(`server running on port: ${port}`);
    
})
    server.on("error",(err)=>{
        console.error(err);
        process.exit(1)
    })

    }catch(err){
        console.error("Failed to start",err)
        process.exit(1)
    }
    
}

start()




