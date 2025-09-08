import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "../dtos/create-department.dto";
import { DEPARTMENT_REPOSITORY, IDepartmentRepository } from "../interfaces/department.repository.interface";
import { ERROR_MESSAGES } from "src/constants/error-message";

@Injectable()
export class CreateDepartmentUseCase {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly departmentRepository: IDepartmentRepository
    ) { }

    async execute(department: CreateDepartmentDto) {
        const departmentExists = await this.departmentRepository.findOneBy({ name: department.name });
        if (departmentExists) {
            throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS('Department', department.name));
        }
        return await this.departmentRepository.create(department);
    }
}