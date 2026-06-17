import { Controller, Delete, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("user")
export class UserController{

    constructor(
        private readonly userService: UserService
    ){}

    @Get()
    async getById(@Req() req: Request){
        return await this.userService.findById((req as any).user.userId)
    }

    @Delete()
    async deleteById(@Req() req: Request){
        return await this.userService.deleteById((req as any).user.userId)
    }
}