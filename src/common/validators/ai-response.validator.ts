import { BadRequestException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate   } from "class-validator";

export async function parseAndValidateAi<T extends object>(

    input: string,
    dtoClass: new () => T,

):Promise<T> {
    try {
       
        const start = input.indexOf('[')
        const end = input.lastIndexOf(']')

        if(start === -1 || end ===-1 ){

            throw new BadRequestException("No JSON array found")
        }

        const cleaned = input.slice(start, end+1)
        const parsed = JSON.parse(cleaned)

        const instance = plainToInstance(dtoClass, {slides: parsed})

        const errors = await validate(instance)

        return instance

    }
    catch(e){
        throw new BadRequestException(`Parsing failed: ${e.message}`)
    }
} 