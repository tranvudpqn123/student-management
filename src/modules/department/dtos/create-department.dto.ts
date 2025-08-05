import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;
}