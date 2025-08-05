import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateTeacherDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;

    @IsNumber()
    @Min(100000)
    salary: number;

    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    departmentIds?: string[];  // Đây là mảng các ID của Department
}