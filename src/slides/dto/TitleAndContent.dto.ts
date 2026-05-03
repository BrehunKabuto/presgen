import {IsIn, IsString} from 'class-validator';
import { TitleSlideDto } from './TitleSlide.dto';

export class TitleAndContentDto extends TitleSlideDto {

    @IsString()
    content: string
   
} 
