import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { CreatePresentationDto } from "./dto/createPresentation.dto";
import { PresentationServices } from "./presentation.services";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("presentation")
export class PresentationController {
    constructor(private readonly presentationServices: PresentationServices) {}

    @Post()
    async create(@Body() data: CreatePresentationDto): Promise<any> {
         return await this.presentationServices.create(data)
        
    }

}