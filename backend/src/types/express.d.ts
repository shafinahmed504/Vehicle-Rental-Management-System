import { Role } from "../middleware/auth"
import "express";

declare global{
    namespace Express{
        interface Request{
            user?:{
                id:string,
                name:string,
                email:string,
                role:Role
            }
        }
    }
}

export {}