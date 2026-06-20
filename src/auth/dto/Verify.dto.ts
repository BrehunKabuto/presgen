import { IsEmail, IsString } from "class-validator";

export class VerifyDto{

     @IsString()
    code!:string
    @IsEmail()
    email!: string
}