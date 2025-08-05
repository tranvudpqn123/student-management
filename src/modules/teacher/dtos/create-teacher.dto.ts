import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";
import { IsValidName } from "src/decorators/is-valid-name.decorator";

export class CreateTeacherDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @IsValidName()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @IsValidName()
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