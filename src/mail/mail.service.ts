import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { BrevoClient } from "@getbrevo/brevo";

@Injectable()
export class MailService {

    
    private client = new BrevoClient({
        apiKey: process.env.BREVO_API!,
    });
    
   async sendCode(email: string, code: string) {

    try{
        await this.client.transactionalEmails.sendTransacEmail({
            sender: {email:process.env.MAIL_USER, name:process.env.MAIL_NAME},
            to: [{email}],
            scheduledAt: "Verification code",
            textContent: `Your verification code: ${code}`

        })
      
        return {success: true}
    }
    catch(e){
        console.log(e)
        throw new InternalServerErrorException("Failed to save verify code")
    }
   }
}