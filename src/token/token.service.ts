import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "prisma/prisma.service";
import { createHash, UUID } from "crypto";


@Injectable()
export class TokenService{

    constructor(
        private jwt: JwtService,
         private readonly prisma: PrismaService
        ){}

    signAccess(userId: number){
        return this.jwt.sign(
            {userId},
            {secret: process.env.ACESS_SECRET, expiresIn: "15m"}
        )    
    }

    signRefresh(userId: number){
          return this.jwt.sign(
            {userId},
            {secret: process.env.REFRESH_SECRET, expiresIn: "30d"}
        )  
    }

    async createRefreshToken(token: string, userId: number, familyId: string){

        await this.prisma.refreshToken.create({data:{
            userId,
            hashedToken:  this.hashToken(token),
            familyId
        }}) 
    }

    async getTokenByRaw(refreshToken: string){
       return this.prisma.refreshToken.findUnique({
            where: {hashedToken: this.hashToken(refreshToken) }
        })
    }

    hashToken(token: string){

        return createHash("sha256").update(token).digest("hex")
    }

    
    verifyRefresh(token:string){
        return this.jwt.verify(token,{
            secret:process.env.REFRESH_SECRET
        })
    }


    async rotateRefreshToken(incomingToken: string){

            const record =  await this.getTokenByRaw(incomingToken)
        
                if(!record) throw new UnauthorizedException("Invalid token")
        
                if(record.revokeAt){
                  await  this.prisma.refreshToken.updateMany({
                        where: {familyId: record.familyId},
                        data: {revokeAt: new Date()}
                    })
                    throw new UnauthorizedException("TOken reuse detected")
                }

                await this.prisma.refreshToken.update({
                    where: {id: record.id},
                    data: {revokeAt: new Date()}
                })

                return {userId: record.userId, familyId: record.familyId}
    }



    async revokeFamilyByOneToken(token: string){

        const  record = await this.getTokenByRaw(token)
        if(!record) throw new UnauthorizedException("Invalid token")
        await this.prisma.refreshToken.updateMany({
            where:{familyId: record.familyId},
            data: {revokeAt: new Date()}
        })

    }
  
}