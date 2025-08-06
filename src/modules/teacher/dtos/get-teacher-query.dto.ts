import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/pagination-query.dto";


export class GetTeacherQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    lastName?: string;
}