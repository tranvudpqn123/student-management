import { IsEmail, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/pagination-query.dto";

export class GetUserQueryDto extends PaginationQueryDto {
    @IsString()
    @IsOptional()
    role?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}