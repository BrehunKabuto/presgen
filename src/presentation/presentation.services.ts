import { Inject, Injectable } from "@nestjs/common"; 
import path from "path";
import { CreatePresentationDto } from "./dto/createPresentation.dto";
import { SlidesServices } from "/slides/slides.services";
import { PictureService } from "/pictires/Pictures.service";
import { AiService } from "/ai/ai.service";
import { randomUUID } from "crypto";
import { PictureStorageService } from "/storage/pictureStorage.services";

@Injectable()
export class PresentationServices {
    constructor(private readonly slideServices: SlidesServices,
    @Inject("AUTOMIZER") private readonly automizer: any,
    private readonly pictureService: PictureService,
    private readonly aiService: AiService,
    private readonly pictureStorageService: PictureStorageService)   {} 
     
    async create(createData: CreatePresentationDto) {
        
        const presData = await this.aiService.generateSlides(
            createData.userPrompt,
            createData.slideCount,
            createData.providerName,
            createData.modelName
        )

        const picturesNames =await this.pictureService.create(presData.slides)
        const pres = this.automizer  
        .loadRoot("Presentation1.pptx")
        .loadMedia(picturesNames, path.join(process.cwd(), "src/temp/images"))
        .load(`${createData.style}.pptx`, "root")
        
        for (let slide of presData.slides)
        {
            await this.slideServices.create(slide, pres)
        }  
        
        const safeTitle = this.safeFileName(presData.slides[0].title || "presentation")
        const fileName = `${safeTitle}_${randomUUID()}.pptx` 

        await pres.write(fileName); 
        await this.pictureStorageService.cleanPictures()

        return fileName
        
        
    }

    private safeFileName(name: string){

        let safeName = name
        .replace(/[^a-z0-9_\- ]/gi, '')
        .trim()
        .replace(/\s+/g, "_")
        safeName = safeName.slice(0,25)
        return safeName
    }
}