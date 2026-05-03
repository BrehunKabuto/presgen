import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"


export class CreatePresentationDto {

    @IsNumber()
   slideCount!: number
   
   @IsString()
   userPrompt!: string

   @IsString()
   providerName!: string

   @IsOptional()
   @IsString()
   modelName!: string

   @IsString()
   style!: string
}