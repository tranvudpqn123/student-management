import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateDepartmentDto } from "./create-department.dto";

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}