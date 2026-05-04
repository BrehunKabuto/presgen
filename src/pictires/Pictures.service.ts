import { Injectable } from "@nestjs/common";
import { BaseSlideDto } from "/slides/dto/BaseSlide.dto";
import { PexelsPhotoServices } from "./Pexels.service";
import { IPictureSlide } from "/slides/dto/IPictureSlide.dto";

@Injectable()
export class PictureService {

    constructor(private readonly  pexels: PexelsPhotoServices){}

    async create(slides :BaseSlideDto[], presentationName: string){
        const picturesNames : string[] = []
        
        for(const slide of slides){
            
            if("PictureKeyword" in slide){
                if(typeof slide.PictureKeyword === "string"){
                    const pictureName = await this.pexels.searchAndDownloadPhoto(presentationName,slide.PictureKeyword)
                   
                    picturesNames.push(pictureName);
                    (slide as IPictureSlide).PictureFileName = pictureName                    
                 }
            }

        }
        return picturesNames
    }
}