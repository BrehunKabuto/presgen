import { IsOptional, IsString } from "class-validator";
import { IPictureSlide  } from "./IPictureSlide.dto";
import { TitleAndContentDto } from "./TitleAndContent.dto";

export class PictureWithCapationDto extends TitleAndContentDto implements IPictureSlide {
     
    @IsOptional()
    @IsString()
    PictureFileName?: string;

    @IsString()
    PictureKeyword: string;

   
    
}