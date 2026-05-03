import { IsOptional} from 'class-validator';
import { BaseSlideDto } from './BaseSlide.dto';

export class TitleSlideDto extends BaseSlideDto
{
    @IsOptional()
    subtitle?: string
    
}