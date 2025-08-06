import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/pagination-query.dto";

export class GetStudentQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    departmentId?: string;
}