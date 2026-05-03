import { AiProvider } from "./AiProvider";
import OpenAI from "openai";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class OpenAiProvider implements AiProvider{
    
    name = "OpenAI"

    constructor(@Inject("OPENAI_CLIENT") private readonly client: OpenAI){
        client = new OpenAI()
    }

   async generateSlides(message: any[], options?: any):Promise<string>
 {  
    try{

        const response = await this.client.responses.create({
          model: options ?? "o4-mini",
          input: message
        })
        
        return response.output_text
    }
    catch(e){

        throw e
    }


    }
}

export const OpenAiClientProvider = {

    provide:"OPENAI_CLIENT",
    useFactory: () => {
        return new OpenAI({apiKey: process.env.OPENAI_API_KEY}) 
    }

}