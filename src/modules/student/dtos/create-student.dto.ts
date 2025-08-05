import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, Length, Max, Min } from "class-validator";
import { IsValidName } from "src/decorators/is-valid-name.decorator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 50, {
        message: 'Name must be between $constraint1 and $constraint2 characters long'
    })
    @IsValidName()
    name: string;

    @IsNumber()
    @Min(15, {
        message: 'Age must be at least $constraint1 years old'
    })
    @Max(100, {
        message: 'Age must be at most $constraint1 years old'
    })
    age: number;

    @IsString()
    @IsNotEmpty()
    major: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsUUID()
    @IsNotEmpty()
    departmentId: string;

}