import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {DeleteObjectCommand, DeleteObjectsCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
import { readFile } from "fs/promises";
import path from "path";

@Injectable()
export class AwsService {

    
        private client = new S3Client({
            region: "auto",
            endpoint: process.env.AWS_ACOUNT_ENDPOINT,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        })

    async uploadFile(filePath: string,fileName: string): Promise<string>{

        const fileContent = await readFile(path.join(filePath, fileName))
        try{
            await this.client.send(
            new PutObjectCommand({
                Bucket: process.env.BUCKET_NAME!,
                Key: fileName,
                Body:fileContent,
                ContentType: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            })
            )
             const presUrl = `${process.env.PUBLIC_ACCESS_KEY}/${fileName}`

               return presUrl
        }catch(e){

            throw new InternalServerErrorException((e as any).message)
        }
      
    }

    async deleteFile(key: string): Promise<void>{
        try{

            await this.client.send(
                new DeleteObjectCommand({
                    Bucket: process.env.BUCKET_NAME!,
                    Key: key
                })
            )
        }catch(e){
             throw new InternalServerErrorException((e as any).message)
        }
    }

    async deleteManyFiles(keys: string[]): Promise<void>{

        try{

            await this.client.send(
                new DeleteObjectsCommand({
                    Bucket: process.env.BUCKET_NAME!,
                    Delete: {
                        Objects: keys.map((key) => ({Key: key}))
                    }
                })
            )
        }
        catch(e){
            throw new InternalServerErrorException((e as any).message)
        }
    }
}