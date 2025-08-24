import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({message: 'Email should be a string'})
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100, {message: 'Username should be at most 100 characters long'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100, {message: 'Password should be at most 100 characters long'})
    password: string;
}