import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

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

    @IsString()
    name!: string


}