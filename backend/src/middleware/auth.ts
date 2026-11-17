import { NextFunction, Request, Response } from "express"
import{auth as betterAuth} from "../lib/auth"




export type Role="customer"|"admin"

export const auth=(...roles:Role[])=>{

    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const session=await betterAuth.api.getSession({
                headers:req.headers as any
            })

            if(!session){
                return res.status(401).json({
                    success:false,
                    message:"Authentication required. Please log in first."
                })
            }
            const user=session.user
            req.user=user;

            if(roles.length>0 && !roles.includes(user.role as Role)){
                return res.status(403).json({
                    success:false,
                    message:"Access denied. You don't have permission to perform this action."
                })
            }
            next();
            
        } catch (error) {
            next(error)
            
        }
    }

}