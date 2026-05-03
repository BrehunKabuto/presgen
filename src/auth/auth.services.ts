import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { TokenService } from "token/token.service";
import { CreateUserDto } from "user/dto/user.dto";
import { UserService } from "user/user.service";

@Injectable()
export class AuthServices{
    constructor(
        private readonly userServices: UserService,
        private readonly tokenServices: TokenService,
       
    ){}


    createTokens(userId: number){
        const refreshToken = this.tokenServices.signRefresh(userId)
        const accessToken = this.tokenServices.signAccess(userId)

        return {
            refreshToken,
            accessToken
        }
    }

    async issueToken(userId: number){
        const {refreshToken, accessToken} = this.createTokens(userId)
        const familyId = randomUUID()
        await this.tokenServices.createRefreshToken(refreshToken, userId, familyId)

       
         return {
            refreshToken,
            accessToken
        }
    }

    async register(userData: CreateUserDto){
        const user = await this.userServices.create(userData)
        if(!user) throw new UnauthorizedException("cant register")
        return this.issueToken(user.id)
    }
   

    async refresh(incomingToken: string){  

        const {userId, familyId} = await this.tokenServices.rotateRefreshToken(incomingToken)
        const {refreshToken, accessToken} = this.createTokens(userId)
        
        await this.tokenServices.createRefreshToken(refreshToken, userId, familyId)
        return{
            refreshToken,
            accessToken
        }

    }

    async login(userData: CreateUserDto){

        const user = await this.userServices.findByEmail(userData.email)
        if (!user) throw new UnauthorizedException("user dont found")
        if (!await this.userServices.verifyPassword(userData.password, user.hashPassword)) throw new UnauthorizedException("Incorrect password")
        return this.issueToken(user.id)

       
    }

    async logout(token: string){
        this.tokenServices.revokeFamilyByOneToken(token)
    }

  
}