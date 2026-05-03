import { IsString } from "class-validator";
import { BaseSlideDto } from "./BaseSlide.dto";

export class ComparisonDto extends BaseSlideDto{

    @IsString()
    firstCollumTitle: string
    @IsString()
    secondCollumTitle: string
    @IsString()
    firstCollumContent: string
    @IsString()
    secondCollumContent: string
}