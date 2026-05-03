import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { systemPrompt } from "./systemPrompt";
import { AiProvider } from "./providers/AiProvider";
import { parseAndValidateAi } from "/common/validators/ai-response.validator";
import { PresentationDto } from "/presentation/dto/Presentation.dto";

@Injectable()
 export class AiService {

   constructor(
   @Inject("AI_PROVIDERS") private readonly providers: AiProvider[],
   
   ) {}

   private providerMap!: Record<string, AiProvider>
   onModuleInit(){
      this.providerMap = this.providers.reduce((acc, p) => {
         acc[p.name] = p;
         return acc
      }, {} as Record<string, AiProvider>)
   }

   async generateSlides( userPrompt: string, slideCount: number,providerName: string, modelName:string){
     
      const provider = await this.getProvider(providerName)
      const message =await this.generateMessage(userPrompt, slideCount)

      const slides =await provider.generateSlides(message, modelName) 
      const validatedSlides = await parseAndValidateAi(slides, PresentationDto)
      
      return validatedSlides 
   }
   private async getProvider(providerName: string){

      const provider = this.providerMap[providerName]
      if(!provider){
         throw new BadRequestException("cant find AI provider")
      }
      return provider
    }

   private async generateMessage(userPrompt: string, slideCount: number){
      return  [
         {
            role:"system", content: systemPrompt
         },
         {
            role: "user",
            content: `Topic: ${userPrompt}  
            Slide count: ${slideCount}`
         }
      ]
    }
 }