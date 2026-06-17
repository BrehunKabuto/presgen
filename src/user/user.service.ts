import * as argon2 from "argon2";

import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./dto/user.dto";
import { PrismaService } from "prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { PresentationStorage } from "storage/presentationStorage.services";

@Injectable()
export class UserService{

    constructor(
        private readonly prisma: PrismaService,
        private readonly presStorage: PresentationStorage
    ){}

    async create(userData:CreateUserDto){
        
        const existingUser = await this.findByEmail(userData.email)
        if(existingUser) throw new ConflictException("User with this email alredy exists")

        const hashPassword =await this.getHashPassword(userData.password)
        try {
           return await this.prisma.user.create({data:{
                email:userData.email,
                name: userData.name,
                hashPassword: hashPassword
            }})

        }
        catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError){
                if (e.code === "P2002") {
               throw new ConflictException("User with this email alredy exists");
                }
            }
        }
    }
    async findByEmail(email:string){
        return this.prisma.user.findUnique({where: {email} })
    }

    async findById(id: number){
        return await this.prisma.user.findUnique(
            {
                where: {id},
                select:{
                    id: true,
                    name: true,
                     email: true,
                }
            }
        )
    }

    async deleteById(id: number){

        try{
            await this.prisma.user.delete(
                {
                    where: {id}
                }
            )
            this.presStorage.deleteManybyUserId(id)

        }
        catch(e){
            throw new InternalServerErrorException((e as any).message)
        }

    }

   async getHashPassword(password: string){
       return await argon2.hash(password)
    }

    async verifyPassword(password: string,hashed: string ):Promise<boolean>{
        return argon2.verify(hashed, password)
    }
}