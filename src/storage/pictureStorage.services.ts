import { Injectable } from "@nestjs/common"
import axios from "axios"
import fs from "fs"
import path, { join } from "path"
import { readdir, rm } from "fs/promises"

@Injectable()
export class PictureStorageService {

    private readonly downloadDir: string = `${process.cwd()}/src/temp/images`
    async downloadFile(url: string, FileName: string) {
       
        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream"
        })

        const writer = fs.createWriteStream(path.join(this.downloadDir, FileName))
        response.data.pipe(writer)

        return new Promise<void>((resolve, rejects)=> {
            writer.on("finish",() => resolve())
            writer.on("error", rejects)
        })
    }

    async cleanPictures(){

        const files = await readdir(this.downloadDir)

        await Promise.all(
            files.map(file =>{
                rm(join(this.downloadDir, file), {recursive: true, force: true})
            })
        )

    }
}