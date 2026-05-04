import { Injectable, InternalServerErrorException } from "@nestjs/common"
import axios from "axios"
import fs from "fs"
import path, { join } from "path"
import {  rm } from "fs/promises"


@Injectable()
export class PictureStorageService {

    private readonly downloadDir: string = `${process.cwd()}/src/temp/images`
    async downloadFile(url: string, FileName: string, presentationFolder: string) {
       
        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream"
        })

        const writer = fs.createWriteStream(path.join(this.downloadDir, presentationFolder, FileName))
        response.data.pipe(writer)

        return new Promise<void>((resolve, rejects)=> {
            writer.on("finish",() => resolve())
            writer.on("error", rejects)
        })
    }

    async cleanPictures(presentationFolder: string){

        rm(join(this.downloadDir, presentationFolder),{recursive: true, force: true})
    }
    async createPresentationFolder(name:string){

    fs.mkdir(`${this.downloadDir}/${name}`,(error) =>{
            if (error) throw new InternalServerErrorException("failed to create folder")
        })
    }
}