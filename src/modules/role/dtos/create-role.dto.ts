import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    description?: string;
}