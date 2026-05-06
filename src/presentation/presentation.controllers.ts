import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";

import { CreatePresentationDto } from "./dto/createPresentation.dto";
import { PresentationServices } from "./presentation.services";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";
import { PresentationStorage } from "storage/presentationStorage.services";

@UseGuards(AuthGuard("jwt"))
@Controller("presentation")
export class PresentationController {
    constructor(private readonly presentationServices: PresentationServices,
        private readonly presetationStorage: PresentationStorage
    ) {}

    @Post()
    async create(@Req() req: Request,@Body() data: CreatePresentationDto): Promise<any> {
        
         return await this.presentationServices.create(data, (req as any).user.userId)
        
    }

    @Get("byUserId")
    async getByUserId(@Req() req: Request): Promise<any> {

        return await this.presetationStorage.getAllbyUserId((req as any).user.userId)
    }

    @Get("byId")
    async getById(@Req() req: Request, @Param("id") id: string ): Promise<any> {

        return await this.presetationStorage.getById((req as any).user.userId, parseInt(id))
    }

    @Delete("delete")
    async delete(@Req() req: Request, @Param("id") id: string ): Promise<any> {

        return await this.presetationStorage.delete((req as any).user.userId, parseInt(id))
    }
}