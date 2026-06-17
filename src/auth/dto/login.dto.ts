import { IsEmail, IsStrongPassword } from "class-validator";

export class loginDto {

    @IsEmail()
    email!: string

    @IsStrongPassword(({
        minLength: 8,
        minLowercase:1,
        minUppercase:1,
         minNumbers: 0,
        minSymbols: 0,
    }))
    password!: string
}