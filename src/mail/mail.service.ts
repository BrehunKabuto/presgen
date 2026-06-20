import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer"

@Injectable()
export class MailService {

   private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
   })

   async sendCode(email: string, code: string) {

    try{

        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Registration confirmation",
            html: `<h1>You code:<b>${code}</b></h1>`
        })
        return {success: true}
    }
    catch(e){
        console.log(e)
        throw new InternalServerErrorException("Failed to save verify code")
    }
   }
}