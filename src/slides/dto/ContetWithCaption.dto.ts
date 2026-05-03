import { IsString } from "class-validator";
import { TitleAndContentDto } from "./TitleAndContent.dto";

export class ContentWithCaptionDto extends TitleAndContentDto{
    @IsString()
    caption: string
}