import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // because we setting at global
    limit: number = 10; // Default value

    @IsOptional()
    @IsPositive()
    @Type(() => Number) // because we setting at global
    page: number = 1; // Default value
}