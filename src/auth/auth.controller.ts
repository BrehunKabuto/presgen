import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "user/dto/user.dto";
import { AuthServices } from "./auth.services";
import type { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    constructor(private readonly authServices: AuthServices){}

    @Post("register")
    async register(@Res({passthrough: true}) res: Response,@Body() data: CreateUserDto): Promise<any>{
        
        const {refreshToken, accessToken} = await this.authServices.register(data)
        return this.sendTokens(res, refreshToken, accessToken)

    }
    @Post("login")
    async login(@Res({passthrough: true}) res: Response,@Body() data: CreateUserDto){

        const {refreshToken, accessToken} = await this.authServices.login(data)

        return this.sendTokens(res, refreshToken, accessToken)
    }

    @Post("refresh")
    async refresh(
        @Res({passthrough: true}) res: Response,
        @Req() req: Request,
    ){
        
        const token = req.cookies?.["refreshToken"]
        
        if(!token) throw new UnauthorizedException("No refresh token")
        const {refreshToken, accessToken} = await this.authServices.refresh(token)
        
        return this.sendTokens(res, refreshToken, accessToken)
        
    }
    private async sendTokens(
        res: Response,
         refreshToken: string,
          accessToken: string)
        {

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 *1000
        })

        return {
             accessToken
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("logout")
    async logout
    (@Res({passthrough: true}) res: Response,
     @Req() req: Request,
 ){
        const token =  req.cookies?.["refreshToken"]
        if(!token) throw new UnauthorizedException("token not found")
        await this.authServices.logout(token)
        res.clearCookie("refreshToken")
        return {success: true}

    }
}