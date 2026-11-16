import express from "express"
import dotenv from "dotenv"
import { connectToMongoDB } from "./config/db"
import { initCollections } from "./config/initDB"


dotenv.config()


const app=express()

app.use(express.json())

const port=process.env.PORT


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




