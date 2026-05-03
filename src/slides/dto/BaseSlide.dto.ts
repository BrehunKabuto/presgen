import { SlideTypeMap } from '../slide-type';
import type { SlideType } from '../slide-type';

import {IsIn, IsString} from 'class-validator';

export class BaseSlideDto {

    @IsIn(Object.keys(SlideTypeMap))
    type!: SlideType

    @IsString()
    title!: string

}
