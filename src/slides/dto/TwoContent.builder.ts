import { IsString } from "class-validator";
import { BaseSlideDto } from "./BaseSlide.dto";

export class TwoContentDto extends BaseSlideDto{

    @IsString()
    firstContent: string

    @IsString()
    secondContent: string
}