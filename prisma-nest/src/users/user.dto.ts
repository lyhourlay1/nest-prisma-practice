import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class UserDTO{
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    email: string
}