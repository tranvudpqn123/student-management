import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DEPARTMENT_REPOSITORY, IDepartmentRepository } from "../interfaces/department.repository.interface";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { UpdateDepartmentDto } from "../dtos/update-department.dto";

@Injectable()
export class UpdateDepartmentUseCase {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly departmentRepository: IDepartmentRepository
    ) { }

    async execute(id: string, department: UpdateDepartmentDto) {
        const existingDepartment = await this.departmentRepository.findOneBy({ id });
        if (!existingDepartment) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Department'));
        }
        Object.assign(existingDepartment, department);

        return await this.departmentRepository.update(id, existingDepartment);
    }
}