import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 50, {
        message: 'Name must be between $constraint1 and $constraint2 characters long'
    })
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

}