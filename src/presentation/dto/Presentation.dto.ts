import { IsArray, ValidateNested} from "class-validator";
import { BaseSlideDto } from "/slides/dto/BaseSlide.dto";
import { Type } from "class-transformer";

export class PresentationDto {
    @IsArray()
    @ValidateNested({each : true})
    @Type(() => BaseSlideDto)
    slides!: BaseSlideDto[]

}