import { Inject, Injectable } from "@nestjs/common"; 
import path from "path";
import { CreatePresentationDto } from "./dto/createPresentation.dto";
import { SlidesServices } from "/slides/slides.services";
import { PictureService } from "/pictires/Pictures.service";
import { AiService } from "/ai/ai.service";
import { randomUUID } from "crypto";
import { PictureStorageService } from "/storage/pictureStorage.services";
import { AwsService } from "aws/aws.service";
import * as fs from "fs/promises"  

@Injectable()
export class PresentationServices {
    constructor(private readonly slideServices: SlidesServices,
    @Inject("AUTOMIZER") private readonly automizer: any,
    private readonly pictureService: PictureService,
    private readonly aiService: AiService,
    private readonly pictureStorageService: PictureStorageService,
    private readonly awsService: AwsService,
)   {} 
     private readonly presDownloadDir: string = path.join(process.cwd(), "src/temp/pres")
     
    async create(createData: CreatePresentationDto) {
        
        const presData = await this.aiService.generateSlides(
            createData.userPrompt,
            createData.slideCount,
            createData.providerName,
            createData.modelName
        )
         const safeTitle = this.safeFileName(presData.slides[0].title || "presentation")
        const presentationName = `${safeTitle}_${randomUUID()}`
        this.pictureStorageService.createPresentationFolder(presentationName)


        const fileName = `${presentationName}.pptx`
        try{
             const picturesNames =await this.pictureService.create(presData.slides, presentationName)
        const pres = this.automizer  
        .loadRoot("Presentation1.pptx")
        .loadMedia(picturesNames, path.join(process.cwd(), `src/temp/images/${presentationName}`))
        .load(`${createData.style}.pptx`, "root")
        
        for (let slide of presData.slides)
        {
            await this.slideServices.create(slide, pres)
        }  

         

        await pres.write(fileName)
        const presUrl = await this.awsService.aploadFile(this.presDownloadDir,fileName)
        return presUrl
        
        }finally{
             await this.pictureStorageService.cleanPictures(presentationName)
            //  await this.cleanPresentation(fileName)
        }
    }
 
     private async cleanPresentation(fileName: string){

        fs.rm(path.join(this.presDownloadDir, fileName), {
            force: true,
            recursive: true
        })
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