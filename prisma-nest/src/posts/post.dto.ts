import { IsNotEmpty, IsNumber, IsString, IsBoolean, Validate } from 'class-validator';
import { OwnerExistsRule } from './owner-exists-rule';

export class PostDTO{
    @IsString()
    @IsNotEmpty()
    title

    @IsString()
    content

    @IsBoolean()
    @IsNotEmpty()
    published


    @IsNumber()
    @IsNotEmpty()
    // @Validate(OwnerExistsRule)
    authorId



    
    
}