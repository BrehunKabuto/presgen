import { BadRequestException, Injectable, InternalServerErrorException, Res, UnauthorizedException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { TokenService } from "token/token.service";
import { CreateUserDto } from "user/dto/user.dto";
import { UserService } from "user/user.service";
import { loginDto } from "./dto/login.dto";
import { PrismaService } from "prisma/prisma.service";
import { MailService } from "mail/mail.service";
import { VerifyDto } from "./dto/Verify.dto";

@Injectable()
export class AuthServices{
    constructor(
        private readonly userServices: UserService,
        private readonly tokenServices: TokenService,
        private readonly prisma: PrismaService,
        private readonly mailService: MailService
       
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
        return this.sendVerificationCode(userData.email)
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

    async login(userData: loginDto){

        const user = await this.userServices.findByEmail(userData.email)
        if (!user) throw new UnauthorizedException("user dont found")
        if (!await this.userServices.verifyPassword(userData.password, user.hashPassword)) throw new UnauthorizedException("Incorrect password")
        return this.issueToken(user.id)

       
    }

    async logout(token: string){
        this.tokenServices.revokeFamilyByOneToken(token)
    }

    async sendVerificationCode(email: string){

        const exists = await this.userServices.findByEmail(email)
        if (exists?.isVerified) throw new BadRequestException("Email was exist") 

        const code = Math.floor(100000 + Math.random() * 900000).toString()

        try{

            await this.prisma.verificationCode.create({
                data: {
                    email, 
                    code,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
                }
            })
            return await this.mailService.sendCode(email, code)
        }
        catch(e){
            throw new InternalServerErrorException((e as any).message)
        }

    }

    async verifyCode(userData: VerifyDto){
        try{
            const code = await this.prisma.verificationCode.findFirst({
                where: {
                    email: userData.email,
                    code: userData.code
                }
            })
            if(!code) throw new BadRequestException("Invalid or expired code") 
            
           const user = await this.prisma.user.update({
                where:{
                    email: userData.email
                },
                data: {isVerified: true}
            })
            return this.issueToken(user.id)
        }
        catch(e){

            throw new UnauthorizedException("user don't found")
        }
    }  

}