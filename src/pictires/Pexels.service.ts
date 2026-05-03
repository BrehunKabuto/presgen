import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { error } from "console"
import { randomInt } from "crypto"
import { createClient } from "pexels"
import { PictureStorageService } from "/storage/pictureStorage.services"


@Injectable()
export class PexelsPhotoServices{

    
    private client
    constructor(private readonly downloadPictureService: PictureStorageService ){

        const key = process.env.PEXELS_API_KEY
        if(typeof key === 'undefined' ){
            throw new InternalServerErrorException("PEXEL_API_KEY is not defined")
        }
        this.client = createClient(key)
    }

    async searchPhoto(query?: string ){
    if (!query){
        throw new BadRequestException("query for photo is required")
    }

    
       const result =await this.client.photos.search({query})
       
       if(!("photos" in result)){
        throw new NotFoundException("Pexel API error")
       }
       
       if(!result.photos.length){
        throw new NotFoundException(`No photos found for ${query} query`)
       }
       
       const selectedPhoto = result.photos[randomInt(result.photos.length)]
       const PhotoName = this.getFileName(selectedPhoto.src.original)
       await this.downloadPictureService.downloadFile(selectedPhoto.src.original, PhotoName)
       return PhotoName
      
    }
  
    getFileName(url: string) {
        return url.split("?")[0].split("/").pop()!;
}
}