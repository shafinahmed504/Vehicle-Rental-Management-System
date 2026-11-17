import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "../config/db"; 




const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
   
  },
});

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    
    user:{
        additionalFields:{
            role:{
                type:["admin","customer"],
                defaultValue:"customer"
            }
        }
    },
    emailAndPassword:{
        enabled:true,
        requireEmailVerification:true,
        
    },
    emailVerification:{
        sendOnSignUp:true,

        sendVerificationEmail:async({user,url},request)=>{

            try {
  const info = await transporter.sendMail({
    from: `${process.env.SMTP_USER}`, // sender address
    to: `${user.email}`, // list of recipients
    subject: "Clink Link to verify your email", // subject line
    text: `click here : ${url}`, // plain text body
    html: `
  <h2>Email Verification</h2>
  <p>Click the button below to verify your email.</p>
  <a href="${url}">Verify Email</a>
`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);

} catch (err) {
  console.error("Error while sending mail:", err);
}

        }

    }
});