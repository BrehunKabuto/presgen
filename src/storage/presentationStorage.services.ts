import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class PresentationStorage{


    constructor(
        private readonly prisma:PrismaService
    ){}
    async create(userId: number, url: string,name: string){

        try{

            await this.prisma.presentation.create({data:{
                     userId, url, name
             }
          })
        }
        catch(e){
            console.error("Prisma error:", e)
            throw new InternalServerErrorException("Failed to save presentation")
        }
    }

    async getAllbyUserId(userId: number){

        try{

            return await this.prisma.presentation.findMany({
                where: {userId},
                select: {
                    url: true,
                    createAt: true,
                    name: true,
                    id: true
                }
            })
        }
        catch(e){
            throw new InternalServerErrorException("Failed to read presentations")
        }
    }

    async getById(userId: number,id: number){
        try{

            const presentation = await this.prisma.presentation.findFirst({
                where:{userId,id},
                select: {
                     url: true,
                    createAt: true,
                    name: true,
                    id: true
                }
            })

            if (!presentation) throw new NotFoundException("presentation not found")
        }
        catch(e){
            if (e instanceof NotFoundException) throw e
             throw new InternalServerErrorException("Failed to read presentation")
        }
    }

    async delete(userId: number, id: number ){

       try{ await this.prisma.presentation.delete({
            where: {id, userId}
        })

        return {message: "Deleted successfully"}
        }
        catch(e){

            throw new InternalServerErrorException("Failed to delete presentation")
        }
    }
}